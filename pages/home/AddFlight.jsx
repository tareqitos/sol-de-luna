import { Button, TextInput, TouchableOpacity, View } from "react-native";
import Txt from "../../components/Txt";
import Title from "../../components/Title";
import { s } from "../../styles/styles.style";
import { ArrowLeft, Calendar, MoveRight } from "lucide-react-native";
import { useTheme } from "../../hook/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/Container";

import { useRef, useState } from "react";
import DateInput from "../../components/Inputs/DateInput";
import TitleInput from "../../components/Inputs/TitleInput";
import RouteInput from "../../components/Inputs/RouteInput";
import InformationInput from "../../components/Inputs/InformationInput";


export default function AddFlight() {
    const [date, setDate] = useState(new Date(Date.now()));
    const { colors } = useTheme();
    const { params } = useRoute();
    const nav = useNavigation();
    const iataRef = useRef();

    console.log(params)
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
                    <TitleInput name="Flight Name" placeholder="e.g Conference in Tokyo" maxLength={25} />
                </View>

                <View style={{ flexDirection: "row", gap: 20 }}>
                    <View style={[s.form.input_container, { flex: 1 }]}>
                        <DateInput date={date} setDate={setDate} />
                    </View>
                    <View style={s.form.input_container}>
                        <RouteInput iataRef={iataRef} />
                    </View>
                </View>

                <View style={s.form.input_container}>
                    <InformationInput placeholder="Airline, flight number, departure time, etc." />
                </View>

                <TouchableOpacity activeOpacity={1} style={[s.form.button, { backgroundColor: colors.iconSelected }]}>
                    <Txt style={{ color: "white" }}>Save flight</Txt>
                </TouchableOpacity>
            </View>
        </Container>
    )
}