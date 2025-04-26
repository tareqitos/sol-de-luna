import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"

import Collapsible from "react-native-collapsible"
import { useCallback, useState } from "react"
import CollapseButton from "./CollapseButton"
import { s } from "../styles/card.style"

import { Divider, MD3DarkTheme, useTheme } from "react-native-paper"
import CardTitle from "./Cards/CardTitle"
import CardFiles from "./Cards/CardFiles"
import CardInformation from "./Cards/CardInformation"
import CardAddFiles from "./Cards/CardAddFiles"
import CardSection from "./Cards/CardSection"
import CardStars from "./HotelCards/CardStars"
import CardTime from "./Cards/CardTime"
import CardDate from "./Cards/CardDate"
import { MoveRight } from "lucide-react-native"
import CardAddress from "./HotelCards/CardAddress"
import { useDocument } from "../hook/document"

export default function HotelCard({ item, onPress, destination }) {
    const [isCollapsed, setIsCollapse] = useState(true) // CHANGE TO TRUE FOR PROD
    const { colors, elevation } = useTheme()
    const { openDocument, deleteDocument } = useDocument();

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);

    return (
        <View style={[s.card.container, elevation.level1, { backgroundColor: colors.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            {/* TITLE */}
            <View style={s.card.title_container}>
                <CardTitle title={item.name} />
            </View>

            {/* STARS */}
            <CardSection style={{ flexDirection: "row" }}>
                <CardStars stars={item.stars} />
            </CardSection>

            <Divider theme={MD3DarkTheme} />

            {/* CHECK DATE */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CardDate date={item.checkIn} />
                <MoveRight color={colors.primary} size={18} />
                <CardDate date={item.checkOut} hasIcon={false} />
            </CardSection>

            {/* CHECK TIME */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CardTime time={item.checkIn} />
                <MoveRight color={colors.primary} size={18} />
                <CardTime time={item.checkOut} hasIcon={false} />
            </CardSection>


            <Collapsible collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>
                    {/* ADDRESS */}
                    <CardSection style={styles.cardSection} text="Address">
                        <CardAddress address={item.address} />
                    </CardSection>

                    {/* ADDITIONAL INFORMATION */}
                    <CardSection style={styles.cardSection} text={"Additional information"}>
                        <CardInformation item={item} destinationID={destination.id} onPress={onPress} placeholder="Reservation number, instructions, amenities, etc." />
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
                <CardAddFiles item={item} destinationID={destination.id} />
            </Collapsible >
        </View >
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
    }
})