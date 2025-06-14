import { StyleSheet, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { useCallback, useEffect, useState } from "react";
import { Card, Divider, Icon, MD3DarkTheme, useTheme } from "react-native-paper";
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
import { useSettings } from "../../hook/settings";
import { useTranslation } from "react-i18next";
import { CARDS, FORM } from "../../locales/languagesConst";
import { CardBookingRef } from "../Cards/CardBookingRef";
import { SleepsLeft } from "../SleepsLeft";
import { CardContactNumber } from "../Cards/CardContactNumber";
import { CardElementChip } from "../Cards/CardElementChip";
import { copyToClipboard, openMapApp, openPhoneDialer } from "../../services/services";

export default function HotelCard({ item, onPress, destination }) {
    const { cardsOpen } = useSettings()
    const [isCollapsed, setIsCollapse] = useState(cardsOpen)
    const { colors, elevation } = useTheme()
    const { t } = useTranslation();

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
            <View style={s.card.title_container}>
                <CardTitle title={item.name} />
                <Temperature completed={item.completed} coords={{ latitude: item.latitude, longitude: item.longitude }} />
            </View>

            {/* STARS */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CardStars stars={item.stars} />
                </View>
                <SleepsLeft departureDate={item.checkIn} />

            </CardSection>


            <Divider theme={MD3DarkTheme} />

            {/* CHECK DATE */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CardDate date={item.checkIn} />
                <Icon source="arrow-right-thin" color={colors.primary} size={18} />
                <CardDate date={item.checkOut} hasIcon={false} />
            </CardSection>

            {/* CHECK TIME */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CardTime time={item.checkIn} />
                <Icon source="arrow-right-thin" color={colors.primary} size={18} />
                <CardTime time={item.checkOut} hasIcon={false} />
            </CardSection>


            <Collapsible collapsed={isCollapsed} duration={250} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>
                    {/* ADDRESS */}
                    {item.address &&
                        <CardSection style={styles.cardSection} text={t(CARDS.HOTEL_CARD_ADDRESS)}>
                            {/* <CardAddress item={item} /> */}
                            <CardElementChip clickable type="button" icon="map-search-outline" onPress={() => openMapApp(item.latitude, item.longitude, item.address)} element={item.address} />
                        </CardSection>
                    }

                    {/* BOOKING REFERENCE */}
                    {item.bookingReference && <CardSection style={styles.cardSection} text={t(CARDS.BOOKING_REFERENCE)}>
                        {/* <CardBookingRef bookingRef={item.bookingReference || ""} /> */}
                        <CardElementChip clickable icon="checkbook" onPress={() => copyToClipboard(item.bookingReference)} element={item.bookingReference} />

                    </CardSection>}

                    {/* CONTACT NUMBER */}
                    {item.contactNumber && <CardSection style={styles.cardSection} text={t(FORM.CONTACT_NUMBER)}>
                        <CardElementChip clickable icon="phone" onPress={() => openPhoneDialer(item.contactNumber)} element={item.contactNumber} />
                    </CardSection>}

                    {/* ADDITIONAL INFORMATION */}
                    <CardSection style={styles.cardSection} text={t(CARDS.CARD_ADDITIONAL_INFO)}>
                        <CardInformation item={item} destinationID={destination.id} onPress={onPress} placeholder={t(FORM.HOTEL_ADDITIONNAL_INFO_PLACEHOLDER)} />
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
        gap: 10,

    },

    cardSection: {
        marginVertical: 15,
        gap: 10
    }
})