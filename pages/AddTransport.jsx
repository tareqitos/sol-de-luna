import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Icon, useTheme } from "react-native-paper";

import { useSnackbar } from "../hook/useSnackbar";
import { useData } from "../hook/data";

import Container from "../components/Container";
import TitlePage from "../components/TitlePage";
import TransportInput from "../components/Inputs/TransportInput";
import TransportRouteInput from "../components/Inputs/TransportRouteInput";
import DateInput from "../components/Inputs/DateInput";
import InformationInput from "../components/Inputs/InformationInput";

import { s } from "../styles/styles.style";


export default function AddTransport() {
    const nav = useNavigation();
    const { colors, typography } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();
    const { transport, setTransport } = useData()

    const [departDate, setDepartDate] = useState();
    const [arriveDate, setArriveDate] = useState();
    const [transportType, setTransportType] = useState('train')

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            departure: "",
            arrival: "",
            additionalInformation: "",
        },
        mode: "onBlur"
    })

    const onSubmit = (newData) => {
        console.log(newData)
        setTransport([
            ...transport, {
                "id": uuidv4(),
                "type": "transport",
                "transportType": transportType,
                "departureTime": departDate || null,
                "arrivalTime": arriveDate || null,
                "documents": [],
                "completed": false,
                ...newData
            }
        ])

        setMessage("Transport has successfully been added")
        toggleBar();
        nav.goBack()
    }

    const saveTransportType = (type) => {
        setTransportType(type);
        console.log("Transport: ", type)
    }

    const memoizedDepart = useMemo(() => {
        setArriveDate(departDate);
    }, [departDate]);

    useEffect(() => {
        memoizedDepart
    }, [departDate]);

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add transport"} />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <TransportInput transportType={transportType} saveTransportType={saveTransportType} />
                <TransportRouteInput control={control} errors={errors} />
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginTop: 10 }}>
                    <DateInput label="Departs at" newDate={departDate} setNewDate={setDepartDate} />
                    <Icon
                        source="arrow-right"
                        color={colors.primary}
                        size={24} />
                    <DateInput label="Arrives at" checkInDate={departDate} newDate={arriveDate} setNewDate={setArriveDate} />
                </View>
                <View style={[s.form.input_container, s.form.input_addInfos]}>
                    <InformationInput placeholder="Reservation number, instructions, amenities, etc." control={control} />
                </View>
            </KeyboardAwareScrollView>
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