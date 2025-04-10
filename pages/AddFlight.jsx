import { ScrollView, View } from "react-native";
import { s } from "../styles/styles.style";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/Container";

import { useRef, useState } from "react";
import DateInput from "../components/Inputs/DateInput";
import TitleInput from "../components/Inputs/TitleInput";
import RouteInput from "../components/Inputs/RouteInput";
import InformationInput from "../components/Inputs/InformationInput";
import { set, useForm } from "react-hook-form";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useData } from "../hook/data";
import { Button, Portal, useTheme } from "react-native-paper";
import TitlePage from "../components/TitlePage";
import PeopleInput from "../components/Inputs/PeopleInput";
import { useSnackbar } from "../hook/useSnackbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddFlight() {
    const { flights, setFlights } = useData()
    const [date, setDate] = useState();
    const [passengers, setPassengers] = useState([])

    const { setMessage, toggleBar } = useSnackbar();

    const { colors, typography } = useTheme();
    const nav = useNavigation();
    const iataRef = useRef();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            departureAirport: "",
            arrivalAirport: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    })


    const onSubmit = (newData) => {
        setFlights([
            ...flights, {
                "id": uuidv4(),
                "departureDate": date || new Date(),
                "type": "flights",
                "passengers": passengers,
                "documents": [],
                ...newData
            }])
        setMessage("Flight has successfully been added")
        toggleBar();
        nav.goBack()
    }


    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add flight"} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAwareScrollView>
                    <View style={s.form.container}>
                        <View style={s.form.input_container}>
                            <TitleInput name="Flight Name" placeholder="e.g Conference in Tokyo" maxLength={50} control={control} errors={errors} />
                        </View>

                        <View style={{ flexDirection: "row", gap: 20 }}>
                            <View style={[s.form.input_container, { flex: 1 }]}>
                                <DateInput label="Departure time" newDate={date} setNewDate={setDate} />
                            </View>
                        </View>
                        <View style={s.form.input_container}>
                            <RouteInput iataRef={iataRef} control={control} errors={errors} />
                        </View>

                        <PeopleInput passengers={passengers} setPassengers={setPassengers} />

                        <View style={[s.form.input_container, s.form.input_addInfos]}>
                            <InformationInput placeholder="Airline, flight number, departure time, etc." control={control} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <Button icon={"airplane-plus"} mode="contained" style={{ marginBottom: 20 }} labelStyle={[typography.h4, { color: colors.onPrimary }]} onPress={handleSubmit(onSubmit)}>
                Add
            </Button>
        </Container>
    )
}