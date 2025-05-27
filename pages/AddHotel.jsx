import { useEffect, useMemo, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../hook/useSnackbar";
import { useData } from "../hook/data";

import Container from "../components/Utils/Container";
import TitlePage from "../components/Utils/TitlePage";
import TitleInput from "../components/Inputs/TitleInput";
import InformationInput from "../components/Inputs/InformationInput";
import StarInput from "../components/Hotels/StarInput";
import Txt from "../components/Utils/Txt";

import { s } from "../styles/styles.style";
import DateTimeInput from "../components/Inputs/DateTimeInput";
import { ConvertTimeToString, getTimeZoneOffset, mergeDateAndTime } from "../services/date-service";
import HotelSearchMap from "../components/Hotels/HotelSearchMap";
import { useTranslation } from "react-i18next";
import { FORM, MESSAGES, PAGE_TITLES } from "../locales/languagesConst";
import { scheduleNotification } from "../services/notifications";


export default function AddHotels({ route }) {
    const nav = useNavigation();

    const { destination } = route.params;
    const { addItem, updateItem } = useData()
    const { colors, typography } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();
    const { t } = useTranslation();

    const [query, setQuery] = useState("");
    const [coords, setCoords] = useState()
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [stars, setStars] = useState(-1);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    })

    const { isEdit, item, destinationId } = route?.params

    const fillFieldsInEditMode = () => {
        if (item.name) control._reset({ name: item.name, additionalInformation: item.additionalInformation })
        if (item.address) setQuery(item.address);
        if (item.latitude) setCoords({ latitude: item.latitude, longitude: item.longitude });
        if (item.checkIn) {
            const date = new Date(item.checkIn);
            setCheckIn(getTimeZoneOffset(date));
        };
        if (item.checkOut) {
            const date = new Date(item.checkOut)
            setCheckOut(getTimeZoneOffset(date))
        };
        if (stars > -1) setStars(item.stars);
    }

    const onSubmit = async (newData) => {
        try {
            const notificationId = await scheduleNotification(
                "Check-in reminder! 🏨",
                `Your check-in is tomorrow!`,
                checkIn, checkIn
            );

            const newItem = {
                address: query || null,
                latitude: coords?.latitude || null,
                longitude: coords?.longitude || null,

                checkIn: mergeDateAndTime(checkIn, checkIn) || new Date(),
                checkOut: mergeDateAndTime(checkOut, checkOut) || new Date(),
                stars: stars + 1,
                notificationId: notificationId || null,

                ...newData,
            }

            if (isEdit) {
                updateItem(destinationId, { ...newItem, id: item.id, documents: item.documents, type: "hotels" })
                setMessage(t(MESSAGES.HOTEL_EDITED_MESSAGE))
            } else {
                addItem(destination.id, "hotels", newItem)
                console.log("HOTELS: ", newItem)
                setMessage(t(MESSAGES.HOTEL_ADDED_MESSAGE))
            }

            toggleBar();
            nav.goBack()

        } catch (error) {
            console.log("Failed to save hotel: ", error)
        }
    }

    // Handle keyboard dismissal
    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (isEdit === true) {
            fillFieldsInEditMode()
        }
    }, [])

    const buttonStyle = { position: "absolute", bottom: 20, right: 20 }
    const buttonSize = 34

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={handleCloseKeyboard} >
                <FlatList
                    data={[{ key: 'content' }]}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <TitlePage title={isEdit ? t(PAGE_TITLES.EDIT_HOTEL_TITLE) : t(PAGE_TITLES.HOTEL_TITLE)} />
                            <View style={{ flex: 1 }}>
                                <View style={s.form.container}>
                                    <TitleInput name={t(FORM.HOTEL_NAME)} placeholder={t(FORM.HOTEL_NAME_PLACEHOLDER)} control={control} errors={errors} />
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <Txt style={{ color: typography.caption.color }}>{t(FORM.HOTEL_STARS)}</Txt>
                                        <StarInput stars={stars} setStars={setStars} />
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <HotelSearchMap editMode={isEdit} query={query} setQuery={setQuery} setCoords={setCoords} closeKeyboard={handleCloseKeyboard} t={t} />

                                    </View>
                                    <View style={{ gap: 20 }}>
                                        <DateTimeInput label="calendar-start" time={checkIn} setTime={setCheckIn} date={checkIn} setDate={setCheckIn} />
                                        <DateTimeInput label="calendar-end" time={checkOut} setTime={setCheckOut} date={checkOut} setDate={setCheckOut} />
                                    </View>
                                    <View style={[s.form.input_container, s.form.input_addInfos]}>
                                        <InformationInput label={t(FORM.ADDITIONNAL_INFO)} placeholder={t(FORM.HOTEL_ADDITIONNAL_INFO_PLACEHOLDER)} control={control} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                />
            </TouchableWithoutFeedback>
            <View style={buttonStyle}>
                {isEdit ?
                    <>
                        <IconButton icon={"arrow-left"} size={buttonSize} mode="contained" iconColor={colors.onPrimary} containerColor={colors.primary} onPress={() => nav.goBack()} />
                        <IconButton icon={"check"} size={buttonSize} mode="contained" iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
                    </>
                    :
                    <>
                        <IconButton icon={"plus"} size={buttonSize} mode="contained" iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
                    </>
                }
            </View>
        </Container>
    )
}