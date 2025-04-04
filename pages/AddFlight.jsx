import { FlatList, FlatListComponent, ScrollView, TouchableOpacity, View } from "react-native";
import Txt from "../components/Txt";
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
import { useTheme } from "react-native-paper";

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
            <View style={s.header.title_container}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <ArrowLeft color={colors.onBackground} size={20} />
                </TouchableOpacity>
                <Title subtitle="Add flight" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={s.form.container}>
                    <View style={s.form.input_container}>
                        <TitleInput name="Flight Name" placeholder="e.g Conference in Tokyo" maxLength={50} control={control} errors={errors} />
                    </View>

                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <View style={[s.form.input_container, { flex: 1 }]}>
                            <DateInput newDate={date} setNewDate={setDate} />
                        </View>
                    </View>
                    <View style={s.form.input_container}>
                        <RouteInput iataRef={iataRef} control={control} errors={errors} />
                    </View>

                    <View style={s.form.input_container}>
                        <InformationInput placeholder="Airline, flight number, departure time, etc." control={control} />
                    </View>

                    <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={1} style={[s.form.button, { backgroundColor: colors.primary }]}>
                        <Txt style={[typography.h3, { color: colors.onPrimary }]}>Save</Txt>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Container>
    )
}