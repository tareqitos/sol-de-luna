import { StyleSheet, View } from "react-native"

import Collapsible from "react-native-collapsible"
import { useCallback, useEffect, useState, useTransition } from "react"
import CollapseButton from "../UI/CollapseButton"
import { s } from "../../styles/card.style"

import { Divider, Icon, MD3DarkTheme, useTheme } from "react-native-paper"
import CardTitle from "../Cards/CardTitle"
import CardDate from "../Cards/CardDate"
import CardTime from "../Cards/CardTime"
import CardInformation from "../Cards/CardInformation"
import CardAddFiles from "../Cards/CardAddFiles"
import CardPassengers from "./CardPassengers"
import CardSection from "../Cards/CardSection"
import CardFilesManager from "../Cards/CardFilesManager"
import { useSettings } from "../../hook/settings"
import { useTranslation } from "react-i18next"
import { CARDS, FORM } from "../../locales/languagesConst"
import CardRouteCity from "./CardRouteCity"
import CardDuration from "../Cards/CardDuration"
import Txt from "../Utils/Txt"
import { calculateDuration } from "../../services/date-service"


export default function FlightCard({ item, onPress, destination }) {
    const { t } = useTranslation();
    const { cardsOpen } = useSettings()
    const { colors, elevation, typography } = useTheme()
    const [isCollapsed, setIsCollapse] = useState(cardsOpen)

    const duration = (departure, arrival) => {
        return calculateDuration(departure, arrival)
    }

    const hasStop = item.stop ? true : false;


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

            <View style={styles.timeContainer}>
                <CardDate icon="airplane-takeoff" date={item.departureDate} />
                {/* <CardRoute departure={item.departureAirport} arrival={item.arrivalAirport} /> */}
            </View>

            {item.arrivalAirport.iata &&
                <>
                    <View style={[styles.column, { backgroundColor: colors.surface, borderColor: colors.primary }]}>

                        <View style={[styles.row, { alignItems: hasStop ? "flex-start" : "center" }]}>

                            {/* ── left column ── */}
                            <View style={[styles.sideColumn, styles.leftAlign]}>
                                <CardTime icon="airplane-takeoff" hasIcon={true} time={item.departureDate} />
                                <Txt style={[typography.h5, styles.airportCode]}>{item.departureAirport.iata}</Txt>

                            </View>

                            {/* ── middle column ── */}
                            <View style={styles.middleColumn}>

                                {/* the line + duration */}
                                <View style={styles.lineContainer}>
                                    <View style={[hasStop ? styles.line : styles.lineFull, { backgroundColor: colors.primary }]} />


                                    {hasStop ? <View style={styles.sideColumn}>
                                        <CardTime icon="airplane-takeoff" hasIcon={true} time={item.stop.stopEndTime} />
                                        <Txt style={[typography.h5, styles.airportCode]}>{item.stop.stopAirport.iata}</Txt>
                                    </View>
                                        :
                                        item.arrivalDate && <CardDuration duration={duration(item.departureDate, item.arrivalDate)} />
                                    }

                                    {item.arrivalDate &&
                                        <>
                                            <View style={[hasStop ? styles.line : styles.lineFull, { backgroundColor: colors.primary }]} />
                                        </>
                                    }
                                    <View style={{ position: "absolute", right: -6 }}>
                                        <Icon source="arrow-right-thin" color={colors.primary} size={24} />
                                    </View>
                                </View>

                            </View>

                            {/* ── right column ── */}
                            <View style={[styles.sideColumn, styles.rightAlign, { top: item.arrivalDate ? 0 : 10 }]}>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    {item.arrivalDate && <CardTime icon="airplane-landing" hasIcon={true} time={item.arrivalDate} />}
                                    {item.plusOneDay && <Txt style={[typography.bodyInter, { color: colors.primary }]} >+1</Txt>}
                                </View>
                                <Txt style={[typography.h5, styles.airportCode]}>{item.arrivalAirport.iata}</Txt>
                            </View>
                        </View>
                        {hasStop && <View style={[styles.row, { justifyContent: "center", gap: 5, paddingHorizontal: 10 }]}>

                            {item.arrivalDate && <CardDuration duration={duration(item.departureDate, item.stop.stopStartTime)} />}
                            <CardTime icon="airplane-landing" hasIcon={true} time={item.stop.stopStartTime} />
                            {item.arrivalDate && <CardDuration duration={duration(item.stop.stopEndTime, item.arrivalDate)} />}
                        </View>}
                    </View>

                    <View style={[styles.row, { justifyContent: "flex-start", flexWrap: "wrap" }]}>
                        <CardRouteCity departure={item.departureAirport} />
                        {hasStop &&
                            <>
                                <Icon source="arrow-right-thin" color={colors.primary} size={24} />
                                <CardRouteCity stop={item.stop.stopAirport} />
                            </>
                        }
                        <Icon source="arrow-right-thin" color={colors.primary} size={24} />
                        <CardRouteCity arrival={item.arrivalAirport} />
                    </View>
                </>
            }

            <Collapsible collapsed={isCollapsed} duration={250} renderChildrenCollapsed={true} >

                <Divider theme={MD3DarkTheme} />
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
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    column: {
        flexDirection: 'column',
        alignItems: 'space-evenly',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1
    },

    rowTime: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        borderWidth: 1
    },

    sideColumn: {
        flex: .5,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 22,
    },

    leftAlign: {
        alignItems: 'flex-start',
    },

    rightAlign: {
        alignItems: 'flex-end',
    },
    airportCode: {
        fontSize: 18,
        fontWeight: '600',

    },
    middleColumn: {
        flex: 2.2,
        alignItems: 'center',
    },
    lineContainer: {
        flexDirection: 'row',
        gap: 0,
        alignItems: 'center',
        width: '100%',
    },
    line: {
        flex: .5,
        height: 2,
    },
    lineFull: {
        flex: 1,
        height: 2,
    },

    stopsText: {
        marginTop: 4,
        fontSize: 12,
    },

    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 10
    },
})