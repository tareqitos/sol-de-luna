import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { s } from "../styles/styles.style";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/Container";

import { useEffect, useRef, useState } from "react";
import TitleInput from "../components/Inputs/TitleInput";
import RouteInput from "../components/Inputs/RouteInput";
import InformationInput from "../components/Inputs/InformationInput";
import { useForm } from "react-hook-form";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useData } from "../hook/data";
import { Button, useTheme } from "react-native-paper";
import TitlePage from "../components/TitlePage";
import PeopleInput from "../components/Inputs/PeopleInput";
import { useSnackbar } from "../hook/useSnackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimeInput from "../components/Inputs/DateTimeInput";
import { mergeDateAndTime } from "../services/date-service";

export default function AddFlight() {
    const { flights, setFlights } = useData()
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [route, setRoute] = useState({
        departureAirport: { city: "", iata: "" },
        arrivalAirport: { city: "", iata: "" }
    });

    const [passengers, setPassengers] = useState([])

    const { setMessage, toggleBar } = useSnackbar();

    const { colors, typography } = useTheme();
    const nav = useNavigation();
    const iataRef = useRef();
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "",
            departureAirport: { city: "", iata: "" },
            arrivalAirport: { city: "", iata: "" },
            additionalInformation: "",
        },
        mode: "onBlur"
    });

    const onSubmit = (newData) => {
        console.log(newData)
        if (!route.departureAirport.city || !route.departureAirport.iata) {
            return console.log("DEPARTURE REQUIRED")
        }

        if (!route.arrivalAirport.city || !route.arrivalAirport.iata) {
            return console.log("ARRIVAL REQUIRED")
        }

        setFlights([
            ...flights, {
                "id": uuidv4(),
                "departureDate": mergeDateAndTime(date, time) || new Date(),
                "type": "flights",
                "passengers": passengers,
                "documents": [],
                "completed": false,
                "departureAirport": route?.departureAirport || {},
                "arrivalAirport": route?.arrivalAirport || {},
                ...newData
            }])
        setMessage("Flight has successfully been added")
        toggleBar();
        nav.goBack()
    }

    // Handle keyboard dismissal
    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };


    useEffect(() => {
        if (route?.departureAirport && route?.arrivalAirport) {
            reset({
                ...control._defaultValues,
                departureAirport: route.departureAirport,
                arrivalAirport: route.arrivalAirport,
            });
        }
    }, [route, reset]); // Don't forget to add reset to the dependency array

    return (

        <Container style={{ paddingHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={{ flex: 1 }}>


                    <TitlePage title={"Add flight"} />

                    <View style={s.form.input_container}>
                        <RouteInput
                            iataRef={iataRef}
                            setRoute={setRoute}
                        />
                    </View>



                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >

                        <View style={s.form.container}>
                            <View style={s.form.input_container}>
                                <TitleInput name="Flight Name" placeholder="e.g Conference in Tokyo" maxLength={50} control={control} errors={errors} />
                            </View>

                            <View style={{ flexDirection: "row", gap: 20 }}>
                                <View style={[s.form.input_container, { flex: 1 }]}>
                                    <DateTimeInput label="Select date" time={time} setTime={setTime} date={date} setDate={setDate} />
                                </View>
                            </View>


                            <PeopleInput passengers={passengers} setPassengers={setPassengers} />

                            <View style={[s.form.input_container, s.form.input_addInfos]}>
                                <InformationInput placeholder="Airline, flight number, departure time, etc." control={control} />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>

                    <Button icon={"airplane-plus"} mode="contained" style={{ marginBottom: 20 }} labelStyle={[typography.h4, { color: colors.onPrimary }]} onPress={handleSubmit(onSubmit)}>
                        Add
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        </Container>

    )
}