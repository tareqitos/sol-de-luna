import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import Txt from "./Txt"
import { Calendar, Clock, MoveRight, UploadIcon } from "lucide-react-native"
import { ConvertDateToString, ConvertTimetoString } from "../services/date-service"
import Collapsible from "react-native-collapsible"
import { useCallback, useState } from "react"
import CollapseButton from "./CollapseButton"
import { s } from "../styles/card.style"

import AdditionalInformation from "./Cards/Information"
import AddFiles from "./Cards/AddFiles"
import Files from "./Cards/Files"
import { useTheme } from "react-native-paper"

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
                <Txt style={[s.card.title, { color: colors.onBackground, fontSize: 24 }]}>{item.name}</Txt>
            </View>

            <View style={s.card.time_container}>
                <View style={s.card.date}>
                    <Calendar color={colors.primary} size={16} />
                    <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertDateToString(item.departureDate)}</Txt>
                </View>
                <View style={s.card.date}>
                    <Clock color={colors.primary} size={16} />
                    <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertTimetoString(item.departureDate)}</Txt>
                </View>
            </View>

            <View style={[s.card.destination_container, { borderWidth: 1, borderColor: colors.primary }]}>
                <Txt style={[s.card.iata, typography.h4]}>{item.departureAirport}</Txt>
                <MoveRight
                    color={colors.primary}
                    size={14}
                    style={s.card.arrow} />
                <Txt style={[s.card.iata, typography.h4]}>{item.arrivalAirport}</Txt>
            </View>
            <Collapsible collapsed={isCollapsed} collapsedHeight={0} duration={300} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>
                    <AdditionalInformation item={item} onPress={onPress} placeholder="Airline, flight number, departure time, etc." />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.container}>

                            {item.documents.length > 0 && item.documents.map((file) => (
                                <TouchableOpacity
                                    key={file.uri}
                                    activeOpacity={0.9}
                                    onPress={() => openDocument(file.uri)}
                                    onLongPress={() => deleteDocument(item, file.name)}
                                >
                                    <Files file={file} openDocument={openDocument} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <AddFiles item={item} pickDocument={pickDocument} />
                </View>
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