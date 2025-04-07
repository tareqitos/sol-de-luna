import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import Txt from "./Txt"
import { Calendar, Clock, MoveRight, UploadIcon } from "lucide-react-native"
import { ConvertDateToString, ConvertTimetoString } from "../services/date-service"
import Collapsible from "react-native-collapsible"
import { useCallback, useState } from "react"
import CollapseButton from "./CollapseButton"
import { s } from "../styles/card.style"

import AdditionalInformation from "./Cards/CardInformation"
import AddFiles from "./Cards/CardAddFiles"
import Files from "./Cards/CardFiles"
import { Divider, MD3DarkTheme, useTheme } from "react-native-paper"
import CardTitle from "./Cards/CardTitle"
import CardDate from "./Cards/CardDate"
import CardTime from "./Cards/CardTime"
import CardRoute from "./Cards/CardRoute"
import CardFiles from "./Cards/CardFiles"
import CardInformation from "./Cards/CardInformation"
import CardAddFiles from "./Cards/CardAddFiles"

export default function FlightCard({ item, onPress, pickDocument, openDocument, deleteDocument }) {
    const [isCollapsed, setIsCollapse] = useState(false) // CHANGE TO TRUE FOR PROD
    const { colors, elevation, typography } = useTheme()

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);

    return (
        <View style={[s.card.container, elevation.level1, { backgroundColor: colors.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            <View style={s.card.title_container}>
                <CardTitle title={item.name} />
            </View>

            <Divider theme={MD3DarkTheme} />

            <View style={s.card.time_container}>
                <CardDate date={item.departureDate} />
                <CardTime time={item.departureDate} />
            </View>

            <CardRoute departure={item.departureAirport} arrival={item.arrivalAirport} />

            <Collapsible collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>
                    <CardInformation item={item} onPress={onPress} placeholder="Airline, flight number, departure time, etc." />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.container}>

                            {item.documents.length > 0 && item.documents.map((file) => (
                                <TouchableOpacity
                                    key={file.uri}
                                    activeOpacity={0.9}
                                    onPress={() => openDocument(file.uri)}
                                    onLongPress={() => deleteDocument(item, file.name)}
                                >
                                    <CardFiles file={file} openDocument={openDocument} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                </View>
                <CardAddFiles item={item} pickDocument={pickDocument} />
            </Collapsible>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        gap: 10
    }
})