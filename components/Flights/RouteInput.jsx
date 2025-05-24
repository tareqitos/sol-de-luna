import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, List, TextInput, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { FORM } from "../../locales/languagesConst";
import airportsData from "../../data/airports.json"

export default function RouteInput({ iataRef, route, setRoute, t }) {
    const { colors, typography } = useTheme();

    const [airports, setAirports] = useState({});
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);

    const [departureAirport, setDepartureAirport] = useState(route.departureAirport || { city: "", iata: "" });
    const [arrivalAirport, setArrivalAirport] = useState(route.arrivalAirport || { city: "", iata: "" });

    useEffect(() => {
        const hasRouteChanged =
            route?.departureAirport?.city !== departureAirport.city ||
            route?.departureAirport?.iata !== departureAirport.iata ||
            route?.arrivalAirport?.city !== arrivalAirport.city ||
            route?.arrivalAirport?.iata !== arrivalAirport.iata;

        if (hasRouteChanged) {
            if (route?.departureAirport?.city || route?.departureAirport?.iata) {
                setDepartureAirport(route.departureAirport);
            }
            if (route?.arrivalAirport?.city || route?.arrivalAirport?.iata) {
                setArrivalAirport(route.arrivalAirport);
            }
        }
    }, [route]);

    // Fetch airport data
    useEffect(() => {
        const airportsObj = {};
        airportsData.forEach(airport => {
            airportsObj[airport.IATA] = airport;
        });
        setAirports(airportsObj)
    }, []);

    // Filter airports based on input
    const getFilterAirports = (value) => {
        const filtered = Object.values(airports).filter((airport) =>
            airport.City.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAirports(filtered);
    };

    // Handle input changes and show filtered list
    const showList = useCallback((value, field) => {
        if (field === "departureAirport") {
            setDepartureAirport(prev => ({ ...prev, city: value, iata: "" }));
        } else if (field === "arrivalAirport") {
            setArrivalAirport(prev => ({ ...prev, city: value, iata: "" }));
        }

        if (value.length > 1) {
            getFilterAirports(value);
            setIsVisible(true);
            setActiveField(field);
        } else {
            setIsVisible(false);
        }
    }, [getFilterAirports]);

    // Save selected city and IATA code
    const saveSelectedCity = useCallback((city, iata) => {
        if (activeField === "departureAirport") {
            setDepartureAirport({ city, iata });
        } else if (activeField === "arrivalAirport") {
            setArrivalAirport({ city, iata });
        }
        setIsVisible(false);
    }, [activeField]);


    // Trigger setRoute callback when airports are updated
    useEffect(() => {
        const timer = setTimeout(() => {
            if (departureAirport.city && departureAirport.iata) {
                setRoute({ departureAirport, arrivalAirport });
                console.log(route)
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [departureAirport, arrivalAirport]);


    const Item = memo(({ city, iata }) => (
        <View>
            <TouchableOpacity
                onPress={() => saveSelectedCity(city, iata)}
                activeOpacity={1}
                style={[{ backgroundColor: colors.surface }]}
            >
                <List.Item
                    title={`${city} - ${iata}`}
                    style={[styles.item, typography.body]}
                />
            </TouchableOpacity>
            <Divider />
        </View>
    ));

    // Render filtered airport list
    const ResultList = useMemo(() => {
        if (!isVisible || filteredAirports.length === 0) return null;

        return (
            <>
                <View>
                    <IconButton
                        onPress={() => setFilteredAirports([])}
                        icon="close"
                        size={18}
                        iconColor={colors.onSurface}
                        background={colors.surface}
                        style={Platform.OS === "ios" ? { backgroundColor: colors.surface, width: "auto" } : { position: "absolute", zIndex: 200, right: 0 }}
                    />

                </View>
                <View>

                    <FlatList
                        data={filteredAirports.slice(0, 20)} // Limit the results for better performance
                        renderItem={({ item }) => <Item city={item.City} iata={item.IATA} />}
                        keyExtractor={(item) => item.IATA}
                        style={Platform.OS === 'ios' ? styles.containerIOS : styles.container}
                        keyboardShouldPersistTaps="always"
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                </View>
            </>
        );
    }, [isVisible, filteredAirports, colors, saveSelectedCity]);

    return (
        <View>
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>

                <TextInput
                    label={t(FORM.FLIGHT_DEPARTURE_CITY)}
                    placeholder={t(FORM.FLIGHT_DEPARTURE_CITY_PLACEHOLDER)}
                    mode="flat"
                    value={departureAirport.city && departureAirport.iata ? `${departureAirport.city} (${departureAirport.iata})` : departureAirport.city}
                    onChangeText={(text) => showList(text, "departureAirport")}
                    style={[
                        styles.input,
                        departureAirport.city.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}
                    placeholderTextColor={typography.caption.color}
                    inputMode="text"
                    autoCorrect={false}
                    outlineColor={colors.outline}
                    right={
                        <TextInput.Icon
                            icon="airplane-takeoff"
                            size={18}
                            style={{ alignSelf: "baseline" }}
                        />}

                />



                <TextInput
                    ref={iataRef}
                    label={t(FORM.FLIGHT_ARRIVAL_CITY)}
                    placeholder={t(FORM.FLIGHT_ARRIVAL_CITY_PLACEHOLDER)}
                    mode="flat"
                    value={arrivalAirport.city && arrivalAirport.iata ? `${arrivalAirport.city} (${arrivalAirport.iata})` : arrivalAirport.city}
                    onChangeText={(text) => showList(text, "arrivalAirport")}

                    style={[
                        styles.input,
                        arrivalAirport.city.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}

                    placeholderTextColor={typography.caption.color}
                    inputMode="text"
                    autoCorrect={false}
                    outlineColor={colors.outline}
                    right={<TextInput.Icon icon="airplane-landing" style={{ alignSelf: "baseline" }} size={18} />}
                />

            </View>

            {isVisible && ResultList}

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