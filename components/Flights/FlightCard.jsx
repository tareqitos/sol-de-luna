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
    const duration = calculateDuration(item.departureDate, item.arrivalDate)


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


            {/* 
            <CardRouteCity departure={item.departureAirport} arrival={item.arrivalAirport} />


            {item.arrivalDate &&
                <View style={s.card.time_container}>
                    <CardTime icon="calendar-blank-outline" time={item.departureDate} />
                    <CardTime icon="arrow-right" time={item.arrivalDate} />
                    <CardDuration departureTime={item.departureDate} arrivalTime={item.arrivalDate} />
                </View>
            } */}



            {item.arrivalAirport.iata &&
                <>
                    <View style={[styles.row, styles.rowTime, { backgroundColor: colors.surface, borderColor: colors.primary }]}>

                        {/* ── left column ── */}
                        <View style={styles.sideColumn}>
                            <CardTime hasIcon={false} time={item.departureDate} />
                            <Txt style={[typography.h5, styles.airportCode]}>{item.departureAirport.iata}</Txt>
                        </View>

                        {/* ── middle column ── */}
                        <View style={styles.middleColumn}>

                            {/* the line + duration */}
                            {item.arrivalDate && <CardDuration duration={duration} />}
                            <View style={styles.lineContainer}>
                                <View style={[styles.line, { backgroundColor: colors.primary }]} />

                                {item.arrivalDate &&
                                    <>
                                        <View style={[styles.line, { backgroundColor: colors.primary }]} />
                                        <View style={{ position: "relative", right: 5 }}>
                                            <Icon source="arrow-right-thin" color={colors.primary} size={24} />
                                        </View>
                                    </>
                                }
                            </View>

                            {/* {item.stops > 0 && (
                            <Txt style={[styles.stopsText, { color: colors.textSecondary }]}>
                                {item.stops} {item.stops > 1 ? 'escales' : 'escale'} {item.stopAirports.join(', ')}
                            </Txt>
                        )} */}
                        </View>

                        {/* ── right column ── */}
                        <View style={[styles.sideColumn, styles.rightAlign]}>
                            <View style={{ flexDirection: "row", gap: 5 }}>
                                {item.arrivalDate && <CardTime hasIcon={false} time={item.arrivalDate} />}
                                {item.plusOneDay && <Txt style={[typography.bodyInter, { color: colors.primary }]} >+1</Txt>}
                            </View>
                            <Txt style={[typography.h5, styles.airportCode]}>{item.arrivalAirport.iata}</Txt>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <CardRouteCity departure={item.departureAirport} />
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

    rowTime: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        borderWidth: 1
    },

    sideColumn: {
        flex: .5,
        flexDirection: 'column',
    },
    rightAlign: {
        alignItems: 'flex-end',
    },
    airportCode: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 2,
    },
    middleColumn: {
        flex: 2,
        alignItems: 'center',
    },
    lineContainer: {
        flexDirection: 'row',
        gap: 0,
        alignItems: 'center',
        width: '100%',
    },
    line: {
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