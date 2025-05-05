import { useEffect, useMemo, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
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
import { mergeDateAndTime } from "../services/date-service";
import HotelSearchMap from "../components/Hotels/HotelSearchMap";
import { useTranslation } from "react-i18next";
import { FORM, MESSAGES, PAGE_TITLES } from "../locales/languagesConst";


export default function AddHotels({ route }) {
    const nav = useNavigation();
    const { destination } = route.params;
    const { addItem } = useData()
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

    const onSubmit = (newData) => {

        const newItem = {
            address: query || null,
            latitude: coords?.latitude || null,
            longitude: coords?.longitude || null,

            checkIn: mergeDateAndTime(checkIn, checkIn) || new Date(),
            checkOut: mergeDateAndTime(checkOut, checkOut) || new Date(),
            stars: stars + 1,
            ...newData,
        }

        addItem(destination.id, "hotels", newItem)
        console.log("HOTELS: ", newItem)

        setMessage(t(MESSAGES.HOTEL_ADDED_MESSAGE))
        toggleBar();
        nav.goBack()
    }

    // Handle keyboard dismissal
    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    const memoizedCheckOut = useMemo(() => {
        setCheckOut(checkIn);
    }, [checkIn]);

    useEffect(() => {
        memoizedCheckOut
    }, [checkIn]);

    return (
        <Container style={{ paddingHorizontal: 20 }}>

            <TitlePage title={t(PAGE_TITLES.HOTEL_TITLE)} />
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={{ flex: 1 }}>
                    <View style={s.form.container}>
                        <TitleInput name={t(FORM.HOTEL_NAME)} placeholder={t(FORM.HOTEL_NAME_PLACEHOLDER)} control={control} errors={errors} />
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Txt style={{ color: typography.caption.color }}>{t(FORM.HOTEL_STARS)}</Txt>
                            <StarInput stars={stars} setStars={setStars} />
                        </View>
                        {/* <AddressInput name="Address" placeholder="e.g. 123 Beverly Hills..." control={control} errors={errors} /> */}
                        <HotelSearchMap query={query} setQuery={setQuery} setCoords={setCoords} closeKeyboard={handleCloseKeyboard} t={t} />

                        <View style={{ gap: 20 }}>
                            <DateTimeInput label="calendar-start" time={checkIn} setTime={setCheckIn} date={checkIn} setDate={setCheckIn} />
                            <DateTimeInput label="calendar-end" time={checkOut} setTime={setCheckOut} date={checkOut} setDate={setCheckOut} />
                        </View>
                        <View style={[s.form.input_container, s.form.input_addInfos]}>
                            <InformationInput label={t(FORM.ADDITIONNAL_INFO)} placeholder={t(FORM.HOTEL_ADDITIONNAL_INFO_PLACEHOLDER)} control={control} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                <IconButton icon={"plus"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
            </View>
        </Container >
    )
}