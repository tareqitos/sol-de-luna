import { FlatList, ScrollView, Switch, Text, View } from "react-native";
import { s } from "../../styles/styles.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/Title";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import { useTheme } from "../../hook/theme";
import TabBottomMenu from "../../components/TabBottomMenu";
import CardContainer from "../../components/CardContainer";
import Container from "../../components/Container";

const FLIGHTS = [
    {
        id: "1",
        title: "Trip to Taipei",
        departureDate: "2025-04-23T17:15:00",
        departureAirport: "BRU",
        arrivalAirport: "TPE",
        additionnalInformation: "Gate number 2, duration: 8h20m, one stop in Finland, three checked luggage",
        documents: []
    },
    {
        id: "2",
        title: "Weekend in Barcelona ",
        departureDate: "2025-05-15T08:30:00",
        departureTime: "08:30",
        departureAirport: "LHR",
        arrivalAirport: "BCN",
        additionnalInformation: "Gate number 14, duration: 2h45m, direct flight, one carry-on",
        documents: []
    },
    {
        id: "3",
        title: "Business in New York",
        departureDate: "2025-06-05T11:45:00",
        departureAirport: "CDG",
        arrivalAirport: "JFK",
        additionnalInformation: "Gate number 23, duration: 7h50m, direct flight, two checked luggage",
        documents: []
    },
    {
        id: "4",
        title: "Vacation in Maldives",
        departureDate: "2025-07-18T09:20:00",
        departureAirport: "MUC",
        arrivalAirport: "MLE",
        additionnalInformation: "Gate number 8, duration: 10h15m, one stop in Dubai, two checked luggage",
        documents: []
    },
    {
        id: "5",
        title: "Conference in Tokyo",
        departureDate: "2025-08-30T14:50:00",
        departureAirport: "SFO",
        arrivalAirport: "HND",
        additionnalInformation: "Gate number 42, duration: 11h30m, direct flight, one checked luggage",
        documents: []
    },
    {
        id: "6",
        title: "Holiday in Santorini",
        departureDate: "2025-09-12T06:15:00",
        departureAirport: "AMS",
        arrivalAirport: "JTR",
        additionnalInformation: "Gate number 17, duration: 3h40m, one stop in Athens, no checked luggage",
        documents: []
    }
]

export default function Home() {
    const [files, setFiles] = useState()
    const { colors, toggleTheme } = useTheme();

    const [selectedTabName, setSelectedTabName] = useState("home")

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
        <Container>
            <View style={s.home.title} >
                <Title title={"Trips"} subtitle={"Overview"} textColor={colors} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <CardContainer data={FLIGHTS} pickDocument={pickDocument} />
            </ScrollView>

            <Switch
                style={{ position: "absolute", top: 70, right: 20 }}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
            />


            <View style={[s.home.tab_bottom_menu, { backgroundColor: colors.background }]}>
                <TabBottomMenu selectedTabName={selectedTabName} onPress={setSelectedTabName} />
            </View>
        </Container>
    )
}