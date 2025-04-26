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
import { Button, IconButton, useTheme } from "react-native-paper";
import TitlePage from "../components/TitlePage";
import PeopleInput from "../components/Inputs/PeopleInput";
import { useSnackbar } from "../hook/useSnackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimeInput from "../components/Inputs/DateTimeInput";
import { mergeDateAndTime } from "../services/date-service";

export default function AddFlight({ route }) {
    const { destination } = route.params;
    const { addItem } = useData()
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [routes, setRoutes] = useState({
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

        if (!routes.departureAirport.city || !routes.departureAirport.iata) {
            return console.log("DEPARTURE REQUIRED")
        }

        if (!routes.arrivalAirport.city || !routes.arrivalAirport.iata) {
            return console.log("ARRIVAL REQUIRED")
        }

        const newItem = {
            departureDate: mergeDateAndTime(date, time) || new Date(),
            passengers: passengers,
            departureAirport: routes?.departureAirport || {},
            arrivalAirport: routes?.arrivalAirport || {},
            ...newData
        }


        addItem(destination.id, "flights", newItem)
        console.log("FLIGHTS: ", newItem)

        setMessage("Flight has successfully been added")
        toggleBar();
        nav.goBack()
    }

    // Handle keyboard dismissal
    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };


    useEffect(() => {
        if (routes?.departureAirport && routes?.arrivalAirport) {
            reset({
                ...control._defaultValues,
                departureAirport: routes.departureAirport,
                arrivalAirport: routes.arrivalAirport,
            });
        }
    }, [routes, reset]); // Don't forget to add reset to the dependency array

    return (

        <Container style={{ paddingHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={{ flex: 1 }}>


                    <TitlePage title={"Add flight"} />

                    <View style={s.form.input_container}>
                        <RouteInput
                            iataRef={iataRef}
                            setRoute={setRoutes}
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
                    <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                        <IconButton icon={"plus"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Container>

    )
}