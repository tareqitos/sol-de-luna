import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Button, IconButton, useTheme } from "react-native-paper";

import Container from "../components/Utils/Container";
import TitleInput from "../components/Inputs/TitleInput";
import RouteInput from "../components/Flights/RouteInput";
import InformationInput from "../components/Inputs/InformationInput";
import TitlePage from "../components/Utils/TitlePage";
import PeopleInput from "../components/Flights/PeopleInput";
import DateTimeInput from "../components/Inputs/DateTimeInput";

import { s } from "../styles/styles.style";
import { useData } from "../hook/data";
import { useSnackbar } from "../hook/useSnackbar";
import { getTimeZoneOffset, mergeDateAndTime } from "../services/date-service";
import { useTranslation } from "react-i18next";
import { FORM, MESSAGES, PAGE_TITLES } from "../locales/languagesConst";
import { cancelNotification, scheduleNotification } from "../services/notifications";

export default function AddFlight({ route }) {
    const { destination } = route.params;
    const { addItem, updateItem } = useData()
    const { setMessage, toggleBar } = useSnackbar();
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [passengers, setPassengers] = useState([])
    const [routes, setRoutes] = useState({
        departureAirport: { city: "", iata: "" },
        arrivalAirport: { city: "", iata: "" }
    });

    const nav = useNavigation();
    const iataRef = useRef();
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    });

    const { isEdit, item, destinationId } = route?.params || {};

    const fillFieldsInEditMode = () => {
        if (item.name || item.additionalInformation) {
            reset({
                name: item.name || "",
                additionalInformation: item.additionalInformation || ""
            });
        }
        if (item.departureAirport && item.arrivalAirport) {
            setRoutes({
                departureAirport: item.departureAirport,
                arrivalAirport: item.arrivalAirport
            });
        }
        if (item.departureDate) {
            const date = new Date(item.departureDate);
            setDate(getTimeZoneOffset(date));
            setTime(getTimeZoneOffset(date));
        }
        if (item.passengers) {
            setPassengers(item.passengers);
        }
    }

    const onSubmit = async (newData) => {

        try {
            const notificationId = await scheduleNotification(
                "Get ready to fly! 🚀",
                "Your adventure starts tomorrow! Pack your bags and prepare for takeoff!",
                date, time
            );

            const newItem = {
                departureDate: mergeDateAndTime(date, time) || new Date(),
                passengers: passengers,
                departureAirport: routes?.departureAirport || {},
                arrivalAirport: routes?.arrivalAirport || {},
                notificationId: notificationId || null,
                ...newData
            }

            if (isEdit) {
                updateItem(destinationId, { ...newItem, id: item.id, documents: item.documents, type: "flights" })
                setMessage(t(MESSAGES.FLIGHT_EDITED_MESSAGE))
            } else {
                addItem(destination.id, "flights", newItem)
                console.log("FLIGHTS: ", newItem)
                setMessage(t(MESSAGES.FLIGHT_ADDED_MESSAGE))
            }

            toggleBar();
            nav.goBack()

        } catch (error) {
            console.log("Failed to save flight: ", error)
        }


    }

    // Handle keyboard dismissal
    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (isEdit === true) {
            fillFieldsInEditMode();
        }
    }, []);

    useEffect(() => {
        if (routes?.departureAirport && routes?.arrivalAirport) {
            reset((prevState) => ({
                ...prevState,
                departureAirport: routes.departureAirport,
                arrivalAirport: routes.arrivalAirport,
            }));
        }
    }, [routes, reset]);

    return (

        <Container style={{ paddingHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={{ flex: 1 }}>

                    <TitlePage title={isEdit ? t(PAGE_TITLES.EDIT_FLIGHT_TITLE) : t(PAGE_TITLES.FLIGHT_TITLE)} />

                    <View style={{ flex: 1 }}>
                        <View style={s.form.container}>
                            <View style={s.form.input_container}>
                                <TitleInput name={t(FORM.FLIGHT_NAME)} placeholder={t(FORM.FLIGHT_NAME_PLACEHOLDER)} maxLength={50} control={control} errors={errors} />
                            </View>

                            <View style={s.form.input_container}>
                                <RouteInput
                                    iataRef={iataRef}
                                    route={routes}
                                    setRoute={setRoutes}
                                    t={t}
                                />
                            </View>

                            <View style={{ flexDirection: "row", gap: 20, marginTop: 20 }}>
                                <View style={[s.form.input_container, { flex: 1 }]}>
                                    <DateTimeInput label="airplane-clock" time={time} setTime={setTime} date={date} setDate={setDate} />
                                </View>
                            </View>


                            <PeopleInput passengerLabel={t(FORM.FLIGHT_PASSENGER)} seatLabel={t(FORM.FLIGHT_SEAT)} passengers={passengers} setPassengers={setPassengers} />

                            <View style={[s.form.input_container, s.form.input_addInfos]}>
                                <InformationInput label={t(FORM.ADDITIONNAL_INFO)} placeholder={t(FORM.ADDITIONNAL_INFO_PLACEHOLDER)} control={control} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                        {isEdit ?
                            <>
                                <IconButton icon={"arrow-left"} size={30} mode="contained" style={{ width: "50%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={() => nav.goBack()} />
                                <IconButton icon={"check"} size={30} mode="contained" style={{ width: "50%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
                            </>
                            :
                            <IconButton icon={"plus"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Container>

    )
}