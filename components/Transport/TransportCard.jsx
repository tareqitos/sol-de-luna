import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Icon, MD3DarkTheme, useTheme } from "react-native-paper";
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
import { CardBookingRef } from "../Cards/CardBookingRef";
import { SleepsLeft } from "../SleepsLeft";
import { CardElementChip } from "../Cards/CardElementChip";
import { copyToClipboard, openMapApp } from "../../services/services";

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

    return (
        <View style={[s.card.container, elevation.level1, { backgroundColor: colors.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            {/* TITLE */}

            <View >
                <View style={[styles.row, { borderWidth: 1, borderColor: colors.primary, borderRadius: 5, borderBottomWidth: 0, paddingVertical: 10, paddingHorizontal: 10, marginTop: 15 }]}>
                    <Icon source={item.transportType} size={28} color={colors.primary} />
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
                    <SleepsLeft departureDate={item.departureTime} />
                </View>
            </View>

            <Collapsible collapsed={isCollapsed} duration={250} renderChildrenCollapsed={true}>
                <Divider theme={MD3DarkTheme} />
                <View style={s.card.add_container}>

                    {item.address &&
                        <CardSection style={styles.cardSection} text={t(CARDS.DEPARTURE_LOCATION_CARD)}>
                            {/* <CardAddress item={item} /> */}
                            <CardElementChip clickable type="button" icon="map-search-outline" onPress={() => openMapApp(item.latitude, item.longitude, item.address)} element={item.address} />
                        </CardSection>
                    }

                    {/* BOOKING REFERENCE */}
                    {item.bookingReference && <CardSection style={styles.cardSection} text={t(CARDS.BOOKING_REFERENCE)}>
                        <CardElementChip clickable icon="checkbook" onPress={() => copyToClipboard(item.bookingReference)} element={item.bookingReference} />
                    </CardSection>}

                    {/* CONTACT NUMBER */}
                    {item.contactNumber && <CardSection style={styles.cardSection} text={t(FORM.CONTACT_NUMBER)}>
                        <CardElementChip clickable icon="phone" onPress={() => openPhoneDialer(item.contactNumber)} element={item.contactNumber} />
                    </CardSection>}

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