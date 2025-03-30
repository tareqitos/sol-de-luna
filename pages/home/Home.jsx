import { ScrollView, Switch, View } from "react-native";
import { s } from "../../styles/styles.style";
import Title from "../../components/Title";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import { useTheme } from "../../hook/theme";
import TabBottomMenu from "../../components/TabBottomMenu";
import CardContainer from "../../components/CardContainer";
import Container from "../../components/Container";
import { v4 as uuidv4 } from "uuid"

const FLIGHTS = [
    // {
    //     id: (uuidv4 + 1).toString(),
    //     category: "flights",
    //     title: "Trip to Taipei",
    //     departureDate: "2025-04-23T17:15:00",
    //     departureAirport: "BRU",
    //     arrivalAirport: "TPE",
    //     additionnalInformation: "Gate number 2, duration: 8h20m, one stop in Finland, three checked luggage",
    //     documents: []
    // },
    // {
    //     id: uuidv4.toString(),
    //     category: "flights",
    //     title: "Weekend in Barcelona ",
    //     departureDate: "2025-05-15T08:30:00",
    //     departureTime: "08:30",
    //     departureAirport: "LHR",
    //     arrivalAirport: "BCN",
    //     additionnalInformation: "Gate number 14, duration: 2h45m, direct flight, one carry-on",
    //     documents: []
    // },
]

export default function Home() {
    const [files, setFiles] = useState()
    const { colors, toggleTheme } = useTheme();

    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [transport, setTransport] = useState([]);

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

            <ScrollView contentContainerStyle={{ padding: 10, gap: 20 }}>
                <CardContainer data={flights} category="flights" pickDocument={pickDocument} />
                <CardContainer data={hotels} category="hotels" pickDocument={pickDocument} />
                <CardContainer data={transport} category="transport" pickDocument={pickDocument} />
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