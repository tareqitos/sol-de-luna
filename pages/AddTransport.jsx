import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Icon, IconButton, useTheme } from "react-native-paper";

import { useSnackbar } from "../hook/useSnackbar";
import { useData } from "../hook/data";

import Container from "../components/Utils/Container";
import TitlePage from "../components/Utils/TitlePage";
import TransportInput from "../components/Transport/TransportInput";
import TransportRouteInput from "../components/Transport/TransportRouteInput";
import InformationInput from "../components/Inputs/InformationInput";

import { s } from "../styles/styles.style";
import { mergeDateAndTime } from "../services/date-service";
import DateTimeInput from "../components/Inputs/DateTimeInput";
import TransportNumberInput from "../components/Transport/TransportNumberInput";


export default function AddTransport({ route }) {
    const nav = useNavigation();
    const { colors, typography } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();
    const { destination } = route.params;
    const { addItem } = useData()

    const [line, setLine] = useState(null)
    const [departDate, setDepartDate] = useState(new Date());
    const [arriveDate, setArriveDate] = useState(new Date());
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
        const newItem = {
            line: line,
            transportType: transportType,
            departureTime: mergeDateAndTime(departDate, departDate) || null,
            arrivalTime: mergeDateAndTime(arriveDate, arriveDate) || null,
            ...newData
        }

        addItem(destination.id, "transport", newItem)
        console.log("TRANSPORT: ", newItem)


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
                <TransportNumberInput line={line} setLine={setLine} />
                <TransportRouteInput control={control} errors={errors} />
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginVertical: 20 }}>
                    <View style={{ gap: 20 }}>
                        <DateTimeInput label="clock-start" time={departDate} setTime={setDepartDate} date={departDate} setDate={setDepartDate} />
                        <DateTimeInput label="clock-end" time={arriveDate} setTime={setArriveDate} date={arriveDate} setDate={setArriveDate} />
                    </View>
                </View>
                <View style={[s.form.input_container, s.form.input_addInfos]}>
                    <InformationInput placeholder="Reservation number, instructions, amenities, etc. (optional)" control={control} />
                </View>
            </KeyboardAwareScrollView>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 40 }}>
                <IconButton icon={"plus"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handleSubmit(onSubmit)} />
            </View>
        </Container>
    )
}