import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../hook/useSnackbar";
import { useData } from "../hook/data";

import Container from "../components/Container";
import TitlePage from "../components/TitlePage";
import TitleInput from "../components/Inputs/TitleInput";
import AddressInput from "../components/Inputs/AddressInput";
import InformationInput from "../components/Inputs/InformationInput";
import StarInput from "../components/Inputs/StarInput";
import Txt from "../components/Txt";

import { s } from "../styles/styles.style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimeInput from "../components/Inputs/DateTimeInput";
import { mergeDateAndTime } from "../services/date-service";


export default function AddHotels({ route }) {
    const nav = useNavigation();
    const { destination } = route.params;
    const { addItem } = useData()
    const { colors, typography } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();

    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [stars, setStars] = useState(-1);


    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            address: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    })

    const onSubmit = (newData) => {

        const newItem = {
            checkIn: mergeDateAndTime(checkIn, checkIn) || new Date(),
            checkOut: mergeDateAndTime(checkOut, checkOut) || new Date(),
            stars: stars + 1,
            ...newData,
        }

        addItem(destination.id, "hotels", newItem)
        console.log("HOTELS: ", newItem)

        setMessage("Hotel has successfully been added")
        toggleBar();
        nav.goBack()
    }

    const memoizedCheckOut = useMemo(() => {
        setCheckOut(checkIn);
    }, [checkIn]);

    useEffect(() => {
        memoizedCheckOut
    }, [checkIn]);

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add hotel"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAwareScrollView>
                    <View style={s.form.container}>
                        <TitleInput name="Hotel / stay name" placeholder="e.g. Hotel Marriot, A night in Paris..." control={control} errors={errors} />
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Txt style={{ color: typography.caption.color }}>If hotel, how many stars?</Txt>
                            <StarInput stars={stars} setStars={setStars} />
                        </View>
                        <AddressInput name="Address" placeholder="e.g. 123 Beverly Hills..." control={control} errors={errors} />

                        <View style={{ gap: 20 }}>
                            <DateTimeInput label="Select check-in time" time={checkIn} setTime={setCheckIn} date={checkIn} setDate={setCheckIn} />
                            <DateTimeInput label="Select check-out time" time={checkOut} setTime={setCheckOut} date={checkOut} setDate={setCheckOut} />
                        </View>
                        <View style={[s.form.input_container, s.form.input_addInfos]}>
                            <InformationInput placeholder="Reservation number, instructions, amenities, etc." control={control} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                <IconButton icon={"plus"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
            </View>
        </Container >
    )
}