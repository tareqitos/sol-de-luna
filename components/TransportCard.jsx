import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Icon, useTheme } from "react-native-paper";
import CollapseButton from "./CollapseButton";
import CardTitle from "./Cards/CardTitle";
import { s } from "../styles/card.style";
import CardTime from "./Cards/CardTime";
import CardInformation from "./Cards/CardInformation";
import CardFiles from "./Cards/CardFiles";
import CardAddFiles from "./Cards/CardAddFiles";
import Collapsible from "react-native-collapsible";
import CardSection from "./Cards/CardSection";
import { getDayDifference } from "../services/date-service";
import Txt from "./Txt";
import { useDocument } from "../hook/document";

export default function TransportCard({ item, onPress }) {
    const [isCollapsed, setIsCollapse] = useState(true) // CHANGE TO TRUE FOR PROD
    const { colors, elevation, typography } = useTheme()
    const { openDocument, deleteDocument } = useDocument();

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);

    const durationDay = getDayDifference(item.arrivalTime, item.departureTime)
    const duration = new Date(Date.parse(item.arrivalTime) - Date.parse(item.departureTime)).toISOString()

    return (
        <View style={[s.card.container, elevation.level1, { backgroundColor: colors.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            {/* TITLE */}

            <View style={styles.rowCenter}>
                <View style={[styles.row]}>
                    <Icon source={item.transportType} size={32} color={colors.primary} />
                    <View>
                        <CardTitle title={item.departure} style={[typography.h5, styles.title]} />
                        <CardTime time={item.departureTime} hasIcon={true} />
                    </View>
                    {/* {item.departureTime && <CardDate date={item.departureTime} hasIcon={false} />} */}
                </View>
                {/* <Icon source="arrow-right-thin" size={32} color={colors.primary} /> */}
                {/* {durationDay !== 0 && <Txt style={typography.caption}>{`Duration: ${durationDay}d`}</Txt>}
                {duration && <CardTime time={duration} hasIcon={false} />} */}

                <View style={styles.row}>
                    <Icon source="flag-checkered" size={32} color={colors.primary} />
                    <View>
                        <CardTitle title={item.arrival} style={[typography.h5, styles.title]} />
                        <CardTime time={item.arrivalTime} hasIcon={true} />
                    </View>
                </View>
            </View>



            <Collapsible collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>

                    {/* ADDITIONAL INFORMATION */}
                    <CardSection style={styles.cardSection} text={"Additional information"}>
                        <CardInformation item={item} onPress={onPress} placeholder="Reservation number, instructions, amenities, etc." />
                    </CardSection>

                    {item.documents.length > 0 &&
                        <CardSection style={styles.cardSection} >
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {/* ADDED FILES */}
                                <View style={styles.container}>
                                    {item.documents.map((file) => (
                                        <TouchableOpacity
                                            key={file.uri}
                                            activeOpacity={0.9}
                                            onPress={() => openDocument(file.uri)}
                                            onLongPress={() => deleteDocument(item, file.name)}
                                        >
                                            <CardFiles file={file} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </CardSection>}
                </View>

                {/* ADD FILE BUTTON */}
                <CardAddFiles item={item} />
            </Collapsible >

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        gap: 10
    },

    cardSection: {
        marginVertical: 10,
        paddingHorizontal: 5,
        gap: 10
    },

    title: {
        // width: 80
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    rowCenter: {
        flexDirection: "",
        alignItems: "",
        gap: 5
    },
})