import { StyleSheet, View } from "react-native"

import Collapsible from "react-native-collapsible"
import { useCallback, useEffect, useState, useTransition } from "react"
import CollapseButton from "../UI/CollapseButton"
import { s } from "../../styles/card.style"

import { Divider, Icon, MD3DarkTheme, useTheme } from "react-native-paper"
import CardTitle from "../Cards/CardTitle"
import CardDate from "../Cards/CardDate"
import CardTime from "../Cards/CardTime"
import CardRoute from "./CardRoute"
import CardInformation from "../Cards/CardInformation"
import CardAddFiles from "../Cards/CardAddFiles"
import CardPassengers from "./CardPassengers"
import CardSection from "../Cards/CardSection"
import CardFilesManager from "../Cards/CardFilesManager"
import { useSettings } from "../../hook/settings"
import { useTranslation } from "react-i18next"
import { CARDS, FORM } from "../../locales/languagesConst"


export default function FlightCard({ item, onPress, destination }) {
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

            <View style={s.card.title_container}>
                <CardTitle title={item.name} />
            </View>

            <Divider theme={MD3DarkTheme} />

            <View style={s.card.time_container}>
                <CardDate date={item.departureDate} />
                <CardTime time={item.departureDate} />
            </View>

            <CardRoute departure={item.departureAirport} arrival={item.arrivalAirport} />

            <Collapsible collapsed={isCollapsed} duration={250} renderChildrenCollapsed={true} >
                {item.passengers.length !== 0 &&
                    <View style={s.card.add_container}>
                        <CardSection style={styles.cardSection} text={t(CARDS.FLIGHT_CARD_PASSENGER)}>
                            <CardPassengers destination={destination} item={item} passengers={item.passengers} />
                        </CardSection>
                    </View>}

                <View style={s.card.add_container}>

                    <CardSection style={styles.cardSection} text={t(CARDS.CARD_ADDITIONAL_INFO)}>
                        <CardInformation item={item} destinationID={destination.id} onPress={onPress} placeholder={t(FORM.ADDITIONNAL_INFO_PLACEHOLDER)} />
                    </CardSection>

                    <CardFilesManager item={item} destinationID={destination.id} />

                </View>
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