import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import Txt from "./Txt"
import { Calendar, Clock, MoveRight, UploadIcon } from "lucide-react-native"
import { ConvertDateToString, ConvertTimetoString } from "../services/date-service"
import Collapsible from "react-native-collapsible"
import { useCallback, useState } from "react"
import CollapseButton from "./CollapseButton"
import { s } from "../styles/card.style"
import { useTheme } from "../hook/theme"
import AdditionalInformation from "./Cards/Information"
import AddFiles from "./Cards/AddFiles"
import Files from "./Cards/Files"

export default function FlightCard({ item, onPress, pickDocument, openDocument, deleteDocument }) {
    const [isCollapsed, setIsCollapse] = useState(true) // CHANGE TO TRUE FOR PROD
    const { colors } = useTheme();

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);

    return (
        <View style={[s.card.container, { backgroundColor: colors.card.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            <View style={s.card.title_container}>
                <Txt style={s.card.title}>{item.name}</Txt>
            </View>

            <View style={s.card.time_container}>
                <View style={s.card.date}>
                    <Calendar color={colors.card.time} size={14} />
                    <Txt style={[s.card.date, { color: colors.card.time }]}>{ConvertDateToString(item.departureDate)}</Txt>
                </View>
                <View style={s.card.date}>
                    <Clock color={colors.card.time} size={14} />
                    <Txt style={[s.card.date, { color: colors.card.time }]}>{ConvertTimetoString(item.departureDate)}</Txt>
                </View>
            </View>

            <View style={s.card.destination_container}>
                <Txt style={s.card.iata}>{item.departureAirport}</Txt>
                <MoveRight
                    color={colors.card.icon}
                    size={14}
                    style={s.card.arrow} />
                <Txt style={s.card.iata}>{item.arrivalAirport}</Txt>
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
        gap: 2
    }
})