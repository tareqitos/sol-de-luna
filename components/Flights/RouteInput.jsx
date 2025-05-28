import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, HelperText, IconButton, List, Modal, Portal, TextInput, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { FORM } from "../../locales/languagesConst";
import airportsData from "../../data/airports.json"
import { RouteField } from "./RouteField";
import { useTranslation } from "react-i18next";

export default function RouteInput({ route, setRoute, error, hasStop = false }) {
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

        if (value.length > 0) {
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
            // Update parent state with current airport values even if incomplete
            setRoute({
                departureAirport,
                arrivalAirport,
                stopAirport,
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [departureAirport, arrivalAirport, stopAirport, hasStop]);

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
        isVisible && (
            <Portal>
                <Modal
                    visible={isVisible}
                    onDismiss={() => setIsVisible(false)}
                    contentContainerStyle={[styles.dropdownContainer, { backgroundColor: colors.surface }]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <RouteField
                            field={activeField === "departureAirport" ? departureAirport : activeField === "stopAirport" ? stopAirport : arrivalAirport}
                            fieldText={activeField}
                            showList={handleInputChange}
                        />

                    </View>
                    <FlatList
                        data={filteredAirports.slice(0, 20)}
                        renderItem={({ item }) => <Item city={item.City} iata={item.IATA} />}
                        keyExtractor={(item) => item.IATA}
                        keyboardShouldPersistTaps="always"
                        nestedScrollEnabled
                        style={{ maxHeight: 250 }}
                    />
                </Modal>
            </Portal>
        )
    return (
        <View>
            {!hasStop ?
                <>
                    <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                        <RouteField
                            label={t(FORM.FLIGHT_DEPARTURE_CITY)}
                            placeholder={t(FORM.FLIGHT_DEPARTURE_CITY_PLACEHOLDER)}
                            field={departureAirport}
                            fieldText="departureAirport"
                            showList={handleInputChange}
                            icon="airplane-takeoff"
                            error={error.airports}
                        />
                        <RouteField
                            label={t(FORM.FLIGHT_ARRIVAL_CITY)}
                            placeholder={t(FORM.FLIGHT_ARRIVAL_CITY_PLACEHOLDER)}
                            field={arrivalAirport}
                            fieldText="arrivalAirport"
                            showList={handleInputChange}
                            icon="airplane-landing"
                            error={error.airports}
                        />
                    </View>
                    <View>
                        {error &&
                            <HelperText type="error" visible={error.airports} padding="none">
                                Please add a city from the list.
                            </HelperText>
                        }
                    </View>
                </>

                :
                <>
                    <RouteField
                        label={t(FORM.FLIGHT_DEPARTURE_CITY)}
                        placeholder={t(FORM.FLIGHT_DEPARTURE_CITY_PLACEHOLDER)}
                        field={stopAirport}
                        fieldText="stopAirport"
                        showList={handleInputChange}
                        icon="airplane-plus"
                        error={error.stop}
                    />
                    <View>
                        {error &&
                            <HelperText type="error" visible={error.stop} padding="none">
                                Please add a city from the list.
                            </HelperText>
                        }
                    </View>
                </>
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
        maxHeight: 250,
        borderRadius: 10,
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
    dropdownContainer: {
        position: "absolute",
        top: Platform.OS === "ios" ? 60 : 50,
        left: 0,
        right: 0,
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 8,
    },
    closeIcon: {
        alignSelf: 'flex-end',
        marginBottom: 4,
    },
});