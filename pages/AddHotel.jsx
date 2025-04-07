import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, useTheme } from "react-native-paper";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { useSnackbar } from "../hook/useSnackbar";
import { useData } from "../hook/data";

import Container from "../components/Container";
import TitlePage from "../components/TitlePage";
import TitleInput from "../components/Inputs/TitleInput";
import AddressInput from "../components/Inputs/AddressInput";
import DateInput from "../components/Inputs/DateInput";
import InformationInput from "../components/Inputs/InformationInput";
import StarInput from "../components/Inputs/StarInput";
import Txt from "../components/Txt";

import { MoveRight } from "lucide-react-native";
import { s } from "../styles/styles.style";


export default function AddHotels() {
    const nav = useNavigation();
    const { colors, typography } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();
    const { hotels, setHotels } = useData()

    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [stars, setStars] = useState(0);


    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            address: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    })

    const onSubmit = (newData) => {
        setHotels([
            ...hotels, {
                "id": uuidv4(),
                "type": "hotels",
                "documents": [],
                "checkIn": checkIn || new Date(),
                "checkOut": checkOut || new Date(),
                "stars": stars + 1,
                ...newData,
            }])

        console.log("PRESS")
        setMessage("Hotel has successfully been added")
        toggleBar();
        // nav.goBack()
    }

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add hotel"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={s.form.container}>
                    <TitleInput name="Hotel / stay name" placeholder="e.g. Hotel Marriot, A night in Paris..." control={control} errors={errors} />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Txt style={{ color: typography.caption.color }}>If hotel, how many stars?</Txt>
                        <StarInput stars={stars} setStars={setStars} />
                    </View>
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
                onPress={handleSubmit(onSubmit)}>
                Add
            </Button>
        </Container>
    )
}