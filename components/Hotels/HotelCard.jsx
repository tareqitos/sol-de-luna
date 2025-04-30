import { StyleSheet, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { useCallback, useState } from "react";
import { Divider, MD3DarkTheme, useTheme } from "react-native-paper";
import { MoveRight } from "lucide-react-native";

import { s } from "../../styles/card.style";
import CollapseButton from "../UI/CollapseButton";
import CardTitle from "../Cards/CardTitle";
import CardInformation from "../Cards/CardInformation";
import CardAddFiles from "../Cards/CardAddFiles";
import CardSection from "../Cards/CardSection";
import CardTime from "../Cards/CardTime";
import CardDate from "../Cards/CardDate";
import CardAddress from "./CardAddress";
import Temperature from "../Temperature";
import CardFilesManager from "../Cards/CardFilesManager";
import CardStars from "./CardStars";

export default function HotelCard({ item, onPress, destination }) {
    const [isCollapsed, setIsCollapse] = useState(true) // CHANGE TO TRUE FOR PROD
    const { colors, elevation } = useTheme()

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
                <Temperature coords={{ latitude: item.latitude, longitude: item.longitude }} />
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
                        <CardAddress item={item} />
                    </CardSection>

                    {/* ADDITIONAL INFORMATION */}
                    <CardSection style={styles.cardSection} text={"Additional information"}>
                        <CardInformation item={item} destinationID={destination.id} onPress={onPress} placeholder="Reservation number, instructions, amenities, etc." />
                    </CardSection>

                    <CardFilesManager item={item} destinationID={destination.id} />
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
        alignItems: "center",
        gap: 10
    },

    cardSection: {
        marginVertical: 10,
        gap: 10
    }
})