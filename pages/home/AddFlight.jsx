import { Button, TextInput, TouchableOpacity, View } from "react-native";
import Txt from "../../components/Txt";
import Title from "../../components/Title";
import { s } from "../../styles/styles.style";
import { ArrowLeft, Calendar, MoveRight } from "lucide-react-native";
import { useTheme } from "../../hook/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import Container from "../../components/Container";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useRef, useState } from "react";


export default function AddFlight() {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    const { colors } = useTheme();
    const { params } = useRoute();
    const nav = useNavigation();
    const iataRef = useRef();

    const onNextIataInput = (text) => {
        if (text.length >= 3) {
            iataRef.current.focus();
        }
    }

    const showDatePicker = () => {
        setIsPickerOpen(true);
    };

    const hideDatePicker = () => {
        setIsPickerOpen(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

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
                    <Txt>Flight Name</Txt>
                    <TextInput
                        style={[s.form.input, { borderColor: colors.grey }]}
                        maxLength={25}
                        placeholder="e.g Conference in Tokyo"
                        placeholderTextColor={colors.grey}
                    />
                </View>

                <View style={{ flexDirection: "row", gap: 20 }}>
                    <View style={[s.form.input_container, { flex: 1 }]}>
                        <Txt>Date</Txt>
                        <TouchableOpacity style={[s.form.input, { borderColor: colors.grey }]} onPress={showDatePicker}>
                            <Txt style={{ fontFamily: "Inter-400" }}>{date.toLocaleDateString()}</Txt>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isPickerOpen}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View style={s.form.input_container}>
                        <Txt>Route</Txt>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <TextInput
                                style={[s.form.input, s.form.route_input, { borderColor: colors.grey }]}
                                maxLength={3}
                                placeholder="e.g BRU"
                                placeholderTextColor={colors.grey}
                                autoCapitalize="characters"
                                inputMode="text"
                                autoCorrect={false}
                                onChangeText={onNextIataInput}
                            />
                            <MoveRight
                                color={colors.card.icon}
                                size={14} />
                            <TextInput
                                ref={iataRef}
                                style={[s.form.input, s.form.route_input, { borderColor: colors.grey }]}
                                maxLength={3}
                                placeholder="e.g NRT"
                                placeholderTextColor={colors.grey}
                                autoCapitalize="characters"
                                inputMode="text"
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={s.form.input_container}>
                    <Txt>Additionnal information</Txt>
                    <TextInput
                        multiline
                        maxLength={200}
                        placeholder="Airline, flight number, departure time, etc."
                        placeholderTextColor={colors.grey}
                        style={[s.form.input, { borderColor: colors.grey, height: 150 }]}
                    />
                </View>
                <TouchableOpacity activeOpacity={1} style={[s.form.button, { backgroundColor: colors.iconSelected }]}>
                    <Txt style={{ color: "white" }}>Save flight</Txt>
                </TouchableOpacity>
            </View>
        </Container>
    )
}