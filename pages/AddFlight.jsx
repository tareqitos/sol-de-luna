import { TouchableOpacity, View } from "react-native";
import Txt from "../components/Txt";
import Title from "../components/Title";
import { s } from "../styles/styles.style";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "../hook/theme";
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
import TimeInput from "../components/Inputs/TimeInput";
import { MergeDateTime } from "../services/date-service";


export default function AddFlight() {
    const { data, setData } = useData()
    const [date, setDate] = useState(new Date(Date.now()));
    const [time, setTime] = useState(new Date(Date.now()))
    const { colors } = useTheme();
    const nav = useNavigation();
    const iataRef = useRef();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            departureAirport: "",
            arrivalAirport: "",
            additionnalInformation: "",
        },
        mode: "onBlur"
    })


    const onSubmit = (newData) => {
        setData({ ...data, flights: [...data.flights, { "id": uuidv4(), "departureDate": MergeDateTime(date, time), "type": "flights", ...newData }] })
        nav.goBack()
    }

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <View style={s.header.title_container}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <ArrowLeft color={colors.text} size={20} />
                </TouchableOpacity>
                <Title subtitle="Add flight" />
            </View>

            <View style={s.form.container}>
                <View style={s.form.input_container}>
                    <TitleInput name="Flight Name" placeholder="e.g Conference in Tokyo" maxLength={50} control={control} errors={errors} />
                </View>

                <View style={{ flexDirection: "row", gap: 20 }}>
                    <View style={[s.form.input_container, { flex: 1 }]}>
                        <DateInput date={date} setDate={setDate} />
                    </View>
                    <View style={[s.form.input_container, { flex: 1 }]}>
                        <TimeInput time={time} setTime={setTime} />
                    </View>
                </View>
                <View style={s.form.input_container}>
                    <RouteInput iataRef={iataRef} control={control} errors={errors} />
                </View>

                <View style={s.form.input_container}>
                    <InformationInput placeholder="Airline, flight number, departure time, etc." control={control} />
                </View>

                <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={1} style={[s.form.button, { backgroundColor: colors.iconSelected }]}>
                    <Txt style={{ color: "white" }}>Save flight</Txt>
                </TouchableOpacity>
            </View>
        </Container>
    )
}