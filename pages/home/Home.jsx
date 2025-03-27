import { Text, View } from "react-native";
import { s } from "./Home.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/title/Title";
import FlightCard from "../../components/flightCard/FlightCard";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";

const flights_data = {
    title: "Trip to Taipei",
    departureDate: "2025-04-23T17:15:00",
    departureAirport: "BRU",
    arrivalAirport: "TPE",
    additionnalInformation: "Gate number 2, duration: 8h20m, one stop in Finland, three checked luggage",
    documents: []
}

export default function Home() {
    const [files, setFiles] = useState()

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        })

        if (result.canceled === false) {
            setFiles([...files, result.assets[0]])
            console.log(result.assets[0]);
        } else {
            console.log('Document picking was cancelled')
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={s.container}>
                <View style={s.title} >
                    <Title />
                </View>

                <View style={s.cards}>
                    <FlightCard data={flights_data} onPress={pickDocument} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}