import { ScrollView, TouchableOpacity, View } from "react-native";
import Container from "../components/Container";
import { s } from "../styles/styles.style";
import { useNavigation } from "@react-navigation/native";
import { Button, useTheme } from "react-native-paper";
import TitlePage from "../components/TitlePage";
import HotelSearchMap from "../components/HotelSearchMap";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import TitleInput from "../components/Inputs/TitleInput";
import AddressInput from "../components/Inputs/AddressInput";
import DateInput from "../components/Inputs/DateInput";
import DateRangeInput from "../components/Inputs/DateRangeInput";
import { MoveRight } from "lucide-react-native";
import InformationInput from "../components/Inputs/InformationInput";
import StarInput from "../components/Inputs/StarInput";

export default function AddHotels() {
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()


    const nav = useNavigation();
    const { colors, typography } = useTheme();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            address: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    })

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add hotel"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={s.form.container}>
                    <TitleInput name="Hotel name" placeholder="e.g. Hotel Marriot, A night in Paris..." control={control} errors={errors} />
                    <StarInput />
                    <AddressInput name="Address" placeholder="e.g. 123 Beverly Hills..." control={control} errors={errors} />

                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <DateInput label="Check-in" newDate={checkIn} setNewDate={setCheckIn} />
                        <MoveRight
                            color={colors.primary}
                            size={14} />
                        <DateInput label="Check-out" newDate={checkOut} setNewDate={setCheckOut} />
                    </View>
                    <View style={[s.form.input_container, s.form.input_addInfos]}>
                        <InformationInput placeholder="Airline, flight number, departure time, etc." control={control} />
                    </View>
                </View>
            </ScrollView>
            <Button
                icon={"plus-box"}
                mode="contained"
                style={{ marginBottom: 20 }}
                labelStyle={[typography.h4, { color: colors.onPrimary }]}
                onPress={"handleSubmit(onSubmit)"}>
                Add
            </Button>
        </Container>
    )
}