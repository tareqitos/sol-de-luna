import { ScrollView, TouchableOpacity, View } from "react-native";
import Title from "../components/Title";
import { s } from "../styles/styles.style";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/Container";

import { useRef, useState } from "react";
import DateInput from "../components/Inputs/DateInput";
import TitleInput from "../components/Inputs/TitleInput";
import RouteInput from "../components/Inputs/RouteInput";
import InformationInput from "../components/Inputs/InformationInput";
import { useForm } from "react-hook-form";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useData } from "../hook/data";
import { Button, useTheme } from "react-native-paper";
import TitlePage from "../components/TitlePage";

export default function AddFlight() {
    const { flights, setFlights } = useData()
    const [date, setDate] = useState();
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
            ...flights,
            {
                "id": uuidv4(),
                "departureDate": date || new Date(),
                "type": "flights",
                "documents": [],
                ...newData
            }])

        nav.goBack()
    }


    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add flight"} />

            <ScrollView showsVerticalScrollIndicator={false}>

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

                    <View style={s.form.input_container}>
                        <InformationInput placeholder="Airline, flight number, departure time, etc." control={control} />
                    </View>

                </View>
            </ScrollView>
            <Button icon={"airplane-plus"} mode="contained" style={{ marginBottom: 20 }} labelStyle={[typography.h4, { color: colors.onPrimary }]} onPress={handleSubmit(onSubmit)}>
                Add
            </Button>
        </Container>
    )
}