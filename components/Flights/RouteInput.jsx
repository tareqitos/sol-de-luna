import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, List, TextInput, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { FORM } from "../../locales/languagesConst";
import airportsData from "../../data/airports.json"
import { RouteField } from "./RouteField";
import { useTranslation } from "react-i18next";

export default function RouteInput({ iataRef, route, setRoute, hasStop = false }) {
    const { t } = useTranslation();
    const { colors, typography } = useTheme();

    // Local state
    const [departureAirport, setDepartureAirport] = useState(route.departureAirport || { city: "", iata: "" });
    const [arrivalAirport, setArrivalAirport] = useState(route.arrivalAirport || { city: "", iata: "" });
    const [stopAirport, setStopAirport] = useState(route.stopAirport || { city: "", iata: "" });

    const [filteredAirports, setFilteredAirports] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);

    // Sync with route changes
    useEffect(() => {
        setDepartureAirport(route.departureAirport || { city: "", iata: "" });
        setArrivalAirport(route.arrivalAirport || { city: "", iata: "" });
        setStopAirport(route.stopAirport || { city: "", iata: "" });
    }, [route]);

    // Filter airports based on input
    const handleInputChange = (value, field) => {
        const update = { city: value, iata: "" };
        if (field === "departureAirport") setDepartureAirport(update);
        else if (field === "stopAirport") setStopAirport(update);
        else setArrivalAirport(update);

        if (value.length > 1) {
            setFilteredAirports(
                airportsData.filter((a) =>
                    a.City.toLowerCase().includes(value.toLowerCase())
                )
            );
            setIsVisible(true);
            setActiveField(field);
        } else {
            setIsVisible(false);
        }
    };

    // Save selection
    const handleSelectAirport = (city, iata) => {
        if (activeField === "departureAirport") setDepartureAirport({ city, iata });
        else if (activeField === "stopAirport") setStopAirport({ city, iata });
        else setArrivalAirport({ city, iata });
        setIsVisible(false);
    };

    // Trigger setRoute on changes
    useEffect(() => {
        const timer = setTimeout(() => {
            if (departureAirport.city && departureAirport.iata) {
                setRoute({ departureAirport, arrivalAirport, stopAirport });
                console.log(route)
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [departureAirport, arrivalAirport, stopAirport]);

    // Airport List Item
    const Item = memo(({ city, iata }) => (
        <View style={[{ backgroundColor: colors.surface }]}>
            <List.Item
                title={`${city} - ${iata}`}
                onPress={() => handleSelectAirport(city, iata)}
                style={[styles.item, typography.body, { backgroundColor: colors.surface }]}
            />
            <Divider />
        </View>
    ));

    // Render filtered airport list
    const renderAirportList = () =>
        isVisible && filteredAirports.length > 0 && (
            <View>
                <IconButton
                    onPress={() => setFilteredAirports([])}
                    icon="close"
                    size={18}
                    iconColor={colors.onSurface}
                    style={Platform.OS === "ios" ? { backgroundColor: colors.surface } : { position: "absolute", zIndex: 200, right: 0 }}
                />
                <FlatList
                    data={filteredAirports.slice(0, 20)}
                    renderItem={({ item }) => <Item city={item.City} iata={item.IATA} />}
                    keyExtractor={(item) => item.IATA}
                    style={Platform.OS === "ios" ? styles.containerIOS : styles.container}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        );

    return (
        <View>
            {!hasStop ?
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                    <RouteField
                        label={t(FORM.FLIGHT_DEPARTURE_CITY)}
                        placeholder={t(FORM.FLIGHT_DEPARTURE_CITY_PLACEHOLDER)}
                        field={departureAirport}
                        fieldText="departureAirport"
                        showList={handleInputChange}
                        icon="airplane-takeoff"
                    />
                    <RouteField
                        label={t(FORM.FLIGHT_ARRIVAL_CITY)}
                        placeholder={t(FORM.FLIGHT_ARRIVAL_CITY_PLACEHOLDER)}
                        field={arrivalAirport}
                        fieldText="arrivalAirport"
                        showList={handleInputChange}
                        icon="airplane-landing"
                    />
                </View>
                :
                <RouteField
                    label={t(FORM.FLIGHT_DEPARTURE_CITY)}
                    placeholder={t(FORM.FLIGHT_DEPARTURE_CITY_PLACEHOLDER)}
                    field={stopAirport}
                    fieldText="stopAirport"
                    showList={handleInputChange}
                    icon="airplane-plus"
                />
            }
            {renderAirportList()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        zIndex: 10,
        maxHeight: 500,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    containerIOS: {
        position: "absolute",
        width: "100%",
        zIndex: 10,
        maxHeight: 500,
        borderRadius: 10
    },

    item: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 0
    },
});