import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Checkbox, IconButton, useTheme } from "react-native-paper";


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

import { calculateDuration, getTimeZoneOffset, mergeDateAndTime } from "../services/date-service";
import { useTranslation } from "react-i18next";
import { FORM, MESSAGES, PAGE_TITLES } from "../locales/languagesConst";
import { cancelNotification, scheduleNotification } from "../services/notifications";
import { AddOneDayInput } from "../components/Flights/AddOneDayInput";


export default function AddFlight({ route }) {
    const { destination } = route.params;
    const { addItem, updateItem } = useData()
    const { setMessage, toggleBar } = useSnackbar();
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [arrivalTime, setArrivalTime] = useState(new Date());
    const [arrivalDate, setArrivalDate] = useState(new Date());

    const [stopDate, setStopDate] = useState(new Date());
    const [stopStartTime, setStopStartTime] = useState(new Date());
    const [stopEndTime, setStopEndTime] = useState(new Date());

    const [plusOneDay, setPlusOneDay] = useState(false);
    const [passengers, setPassengers] = useState([])
    const [routes, setRoutes] = useState({
        departureAirport: { city: "", iata: "" },
        arrivalAirport: { city: "", iata: "" },
        stopAirport: { city: "", iata: "" },
    });

    const [hasStop, setHasStop] = useState(false);

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
                departureAirport: item.departureAirport || {},
                arrivalAirport: item.arrivalAirport || {}
            });

            if (item.stop) {
                setHasStop(true);
                const startTime = new Date(item.stop.stopStartTime);
                const endTime = new Date(item.stop.stopEndTime);
                setStopStartTime(getTimeZoneOffset(startTime) || new Date());
                setStopEndTime(getTimeZoneOffset(endTime) || new Date());
                setRoutes(prev => ({
                    ...prev,
                    stopAirport: item.stop.stopAirport || {}
                }));
            } else {
                setHasStop(false);
            }
        }
        if (item.departureDate) {
            const date = new Date(item.departureDate);
            setDate(getTimeZoneOffset(date));
            setTime(getTimeZoneOffset(date));

        }
        if (item.arrivalDate) {
            const date = new Date(item.arrivalDate);
            setArrivalDate(getTimeZoneOffset(date));
            setArrivalTime(getTimeZoneOffset(date));
        }

        if (item.plusOneDay) {
            setPlusOneDay(item.plusOneDay);
        } else {
            setPlusOneDay(false);

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

            const stop = {
                stopStartTime: mergeDateAndTime(date, stopStartTime) || new Date(),
                stopEndTime: mergeDateAndTime(date, stopEndTime) || new Date(),
                stopAirport: hasStop ? routes?.stopAirport || {} : null,
            }


            const newItem = {
                departureDate: mergeDateAndTime(date, time) || new Date(),
                arrivalDate: mergeDateAndTime(arrivalDate, arrivalTime || new Date()),
                stop: hasStop ? stop : null,
                plusOneDay: plusOneDay,
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
        setArrivalDate(date);
    }, [date]);

    const buttonSize = 34

    return (
        <Container style={styles.container}>
            <FlatList
                data={[{ key: 'content' }]}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                        <View>
                            <TitlePage title={isEdit ? t(PAGE_TITLES.EDIT_FLIGHT_TITLE) : t(PAGE_TITLES.FLIGHT_TITLE)} />

                            <View style={{ flex: 1 }}>
                                <View style={s.form.container}>
                                    <View style={styles.inputContainer}>
                                        <TitleInput name={t(FORM.FLIGHT_NAME)} placeholder={t(FORM.FLIGHT_NAME_PLACEHOLDER)} maxLength={50} control={control} errors={errors} />
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <RouteInput
                                            iataRef={iataRef}
                                            route={routes}
                                            setRoute={setRoutes}
                                        />
                                    </View>


                                    <View style={{ marginVertical: 20 }}>
                                        <View style={[styles.dateTimeContainer, styles.arrivalContainer]}>
                                            <View >
                                                <DateTimeInput hasTime={false} label="airplane-takeoff" time={time} setTime={setTime} date={date} setDate={setDate} />
                                            </View>
                                            <View style={styles.row}>
                                                <DateTimeInput hasDate={false} label="airplane-clock" time={time} setTime={setTime} />
                                                <DateTimeInput hasDate={false} label="arrow-right" time={arrivalTime} setTime={setArrivalTime} date={arrivalDate} setDate={setArrivalDate} />
                                            </View>
                                        </View>


                                        <View style={[styles.inputContainer, styles.stopContainer]}>
                                            <AddOneDayInput date={hasStop ? stopStartTime : arrivalDate} setDate={hasStop ? setStopStartTime : setArrivalDate} plusOneDay={plusOneDay} setPlusOneDay={setPlusOneDay} />
                                            <Checkbox.Item
                                                label="Add a stop"
                                                position="leading"
                                                status={hasStop ? 'checked' : 'unchecked'}
                                                onPress={() => setHasStop(!hasStop)}
                                                style={styles.checkboxItem}
                                            />
                                        </View>

                                        {hasStop &&
                                            <>
                                                <View style={styles.row}>
                                                    <View style={[styles.inputContainer, { flex: 1, gap: 10 }]}>
                                                        <RouteInput
                                                            iataRef={iataRef}
                                                            route={routes}
                                                            setRoute={setRoutes}
                                                            hasStop={hasStop}
                                                        />
                                                    </View>
                                                    <DateTimeInput hasDate={false} time={stopStartTime} setTime={setStopStartTime} />
                                                    <DateTimeInput hasDate={false} time={stopEndTime} setTime={setStopEndTime} label="arrow-right" />
                                                </View>
                                            </>
                                        }
                                    </View>

                                    <PeopleInput passengerLabel={t(FORM.FLIGHT_PASSENGER)} seatLabel={t(FORM.FLIGHT_SEAT)} passengers={passengers} setPassengers={setPassengers} />

                                    <View style={[styles.inputContainer]}>
                                        <InformationInput label={t(FORM.ADDITIONNAL_INFO)} placeholder={t(FORM.ADDITIONNAL_INFO_PLACEHOLDER)} control={control} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}
                scrollEnabled
            />

            <View style={styles.buttonStyle}>
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


const styles = StyleSheet.create({
    container: { paddingHorizontal: 20 },
    row: { flexDirection: "row", alignItems: "center", gap: 5 },
    inputContainer: { gap: 5 },
    dateTimeContainer: { gap: 15, justifyContent: "space-between" },
    arrivalContainer: { flexDirection: "row", alignItems: "center", flex: 1, gap: 5 },
    stopContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
    checkboxItem: { paddingHorizontal: 0, paddingVertical: 0, justifyContent: "flex-start" },
    buttonStyle: { position: "absolute", bottom: 20, right: 20 },
})