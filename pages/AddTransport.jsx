import { useEffect, useMemo, useState, useTransition } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { IconButton, useTheme } from "react-native-paper";

import { useSnackbar } from "../hook/useSnackbar";
import { useData } from "../hook/data";

import Container from "../components/Utils/Container";
import TitlePage from "../components/Utils/TitlePage";
import TransportInput from "../components/Transport/TransportInput";
import TransportRouteInput from "../components/Transport/TransportRouteInput";
import InformationInput from "../components/Inputs/InformationInput";

import { s } from "../styles/styles.style";
import { getTimeZoneOffset, mergeDateAndTime } from "../services/date-service";
import DateTimeInput from "../components/Inputs/DateTimeInput";
import TransportNumberInput from "../components/Transport/TransportNumberInput";
import { useTranslation } from "react-i18next";
import { FORM, MESSAGES, PAGE_TITLES } from "../locales/languagesConst";
import { scheduleNotification } from "../services/notifications";
import { BookingRefInput } from "../components/BookingRefInput";
import HotelSearchMap from "../components/Hotels/HotelSearchMap";
import { ContactNumberInput } from "../components/Hotels/ContactNumberInput";


export default function AddTransport({ route }) {
    const nav = useNavigation();
    const { colors } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();
    const { destination } = route.params;
    const { addItem, updateItem } = useData()
    const { t } = useTranslation();

    const [query, setQuery] = useState("");
    const [coords, setCoords] = useState()

    const [departDate, setDepartDate] = useState(new Date());
    const [arriveDate, setArriveDate] = useState(new Date());
    const [transportType, setTransportType] = useState('train')

    const [contactNumber, setContactNumber] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            departure: "",
            arrival: "",
            bookingReference: "",
            additionalInformation: "",
            contactNumber: "",
        },
        mode: "onBlur"
    })

    const { isEdit, item, destinationId } = route?.params

    const fillFieldsInEditMode = () => {
        if (item.transportType) setTransportType(item.transportType);
        if (item.departureTime) {
            const date = new Date(item.departureTime)
            setDepartDate(getTimeZoneOffset(date))
        };
        if (item.arrivalTime) {
            const date = new Date(item.arrivalTime)
            setArriveDate(getTimeZoneOffset(date))
        };
        if (item.name || item.departure || item.arrival || item.additionalInformation) {
            control._reset({
                name: item.name || "",
                departure: item.departure || "",
                arrival: item.arrival || "",
                additionalInformation: item.additionalInformation || "",
                bookingReference: item.bookingReference || "",
                contactNumber: item.contactNumber || "",
            });
        }

        if (item.address) setQuery(item.address);
        if (item.latitude) setCoords({ latitude: item.latitude, longitude: item.longitude });
    }

    const onSubmit = async (newData) => {
        try {
            const notificationId = scheduleNotification(
                "Your trip starts tomorrow! 🚗",
                "Get ready for your journey!",
                departDate, departDate
            );

            const newItem = {
                address: query || null,
                latitude: coords?.latitude || null,
                longitude: coords?.longitude || null,

                transportType: transportType,
                departureTime: mergeDateAndTime(departDate, departDate) || null,
                arrivalTime: mergeDateAndTime(arriveDate, arriveDate) || null,
                notificationId: notificationId || null,

                contactNumber: contactNumber || null,

                ...newData
            }

            if (isEdit) {
                updateItem(destinationId, { ...newItem, documents: item.documents, id: item.id, type: "transport" })
                setMessage(t(MESSAGES.TRANSPORT_EDITED_MESSAGE))
            } else {
                addItem(destination.id, "transport", newItem)
                console.log("TRANSPORT: ", newItem)
                setMessage(t(MESSAGES.TRANSPORT_ADDED_MESSAGE))
            }

            toggleBar();
            nav.goBack()

        } catch (error) {
            console.log("Failed to save hotel: ", error)
        }

    }

    const saveTransportType = (type) => {
        setTransportType(type);
    }

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
                <View style={{ flex: 1 }}>
                    <TitlePage title={isEdit ? t(PAGE_TITLES.EDIT_TRANSPORT_TITLE) : t(PAGE_TITLES.TRANSPORT_TITLE)} />
                    <TransportInput transportType={transportType} saveTransportType={saveTransportType} t={t} />
                    <TransportNumberInput label={t(FORM.TRANSPORT_NAME)} placeholder={t(FORM.TRANSPORT_NAME_PLACEHOLDER)} control={control} errors={errors} />
                    <TransportRouteInput t={t} control={control} errors={errors} />

                    <View style={{ marginVertical: 10 }}>
                        <HotelSearchMap
                            editMode={isEdit}
                            query={query}
                            setQuery={setQuery}
                            setCoords={setCoords}
                            closeKeyboard={handleCloseKeyboard}
                            label={t(FORM.TRANSPORT_DEPARTURE_LOCATION)}
                            placeholder={t(FORM.TRANSPORT_DEPARTURE_LOCATION_PLACEHOLDER)}
                            t={t}
                        />
                    </View>

                    <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginVertical: 20 }}>
                        <View style={{ gap: 20 }}>
                            <DateTimeInput label="clock-start" time={departDate} setTime={setDepartDate} date={departDate} setDate={setDepartDate} />
                            <DateTimeInput label="clock-end" time={arriveDate} setTime={setArriveDate} date={arriveDate} setDate={setArriveDate} />
                        </View>
                    </View>
                    <View>
                        <BookingRefInput label={t(FORM.TRANSPORT_BOOKING_REFERENCE)} placeholder={t(FORM.TRANSPORT_BOOKING_REFERENCE_PLACEHOLDER)} control={control} errors={errors} />
                    </View>
                    <View style={[s.form.input_container, s.form.input_contact]}>
                        <ContactNumberInput label={t(FORM.CONTACT_NUMBER)} placeholder={t(FORM.CONTACT_NUMBER_PLACEHOLDER)} control={control} />
                    </View>
                    <View style={[s.form.input_container, s.form.input_addInfos]}>
                        <InformationInput label={t(FORM.ADDITIONNAL_INFO)} placeholder={t(FORM.TRANSPORT_ADDITIONNAL_INFO_PLACEHOLDER)} control={control} />
                    </View>
                </View>
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