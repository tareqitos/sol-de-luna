import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import CollapseButton from "../UI/CollapseButton";
import CardTitle from "../Cards/CardTitle";
import { s } from "../../styles/card.style";
import CardTime from "../Cards/CardTime";
import CardInformation from "../Cards/CardInformation";
import CardAddFiles from "../Cards/CardAddFiles";
import Collapsible from "react-native-collapsible";
import CardSection from "../Cards/CardSection";
import CardLine from "./CardLine";
import CardFilesManager from "../Cards/CardFilesManager";
import { useSettings } from "../../hook/settings";
import { useTranslation } from "react-i18next";
import { CARDS, FORM } from "../../locales/languagesConst";

export default function TransportCard({ item, onPress, destination }) {
    const { cardsOpen } = useSettings()
    const [isCollapsed, setIsCollapse] = useState(cardsOpen)
    const { colors, elevation, typography } = useTheme()
    const { t } = useTranslation()

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);

    useEffect(() => {
        setIsCollapse(cardsOpen)
    }, [cardsOpen])

    // const durationDay = getDayDifference(item.arrivalTime, item.departureTime)
    // const duration = new Date(Date.parse(item.arrivalTime) - Date.parse(item.departureTime)).toISOString()

    return (
        <View style={[s.card.container, elevation.level1, { backgroundColor: colors.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            {/* TITLE */}

            <View >
                <View style={[styles.row, { backgroundColor: colors.primary, borderRadius: 5, borderBottomStartRadius: 0, borderBottomEndRadius: 0, paddingVertical: 5, paddingHorizontal: 10, marginTop: 15 }]}>
                    <Icon source={item.transportType} size={28} color={colors.onPrimary} />
                    {item.name && <CardLine line={item.name} />}
                </View>
                <View style={[{ paddingVertical: 10, paddingHorizontal: 10, bottom: 5, borderWidth: 1, borderColor: colors.primary, borderBottomStartRadius: 5, borderBottomEndRadius: 5 }]}>
                    <View style={styles.row}>
                        <CardTitle title={item.departure} style={[typography.h5, { lineHeight: 18 }]} />
                        <Icon source="arrow-right-thin" size={24} color={colors.primary} />
                        <CardTitle title={item.arrival} style={[typography.h5, { flex: 1, lineHeight: 18 }]} />
                    </View>
                    <View style={styles.row}>
                        <CardTime time={item.departureTime} hasIcon={true} />
                        <Icon source="arrow-right-thin" size={24} color={colors.primary} />
                        <CardTime time={item.arrivalTime} hasIcon={true} />
                    </View>
                </View>
            </View>



            <Collapsible collapsed={isCollapsed} duration={250} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>

                    {/* ADDITIONAL INFORMATION */}
                    <CardSection style={styles.cardSection} text={t(CARDS.CARD_ADDITIONAL_INFO)}>
                        <CardInformation item={item} destinationID={destination.id} onPress={onPress} placeholder={t(FORM.TRANSPORT_ADDITIONNAL_INFO_PLACEHOLDER)} />
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
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    rowCenter: {
        gap: 10
    },
})