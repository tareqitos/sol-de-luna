import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, List, TextInput, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { API } from "../../api/api";
import { FORM } from "../../locales/languagesConst";

export default function RouteInput({ iataRef, setRoute, t }) {
    const { colors, typography } = useTheme();

    const [airports, setAirports] = useState({});
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);

    const [departureAirport, setDepartureAirport] = useState({ city: "", iata: "" });
    const [arrivalAirport, setArrivalAirport] = useState({ city: "", iata: "" });

    const [errors, setErrors] = useState({
        departureAirport: "",
        arrivalAirport: "",
    });

    // Fetch airport data
    useEffect(() => {
        const getIataApi = async () => {
            try {
                const result = await API.getIATA();
                setAirports(result);
            } catch (error) {
                console.error("Error fetching API:", error);
            }
        };
        getIataApi();
    }, []);

    // Filter airports based on input
    const getFilterAirports = (value) => {
        const filtered = Object.values(airports).filter((airport) =>
            airport.City.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAirports(filtered);
    };

    // Handle input changes and show filtered list
    const showList = (value, field) => {
        if (field === "departureAirport") {
            setDepartureAirport({ city: value, iata: "" });
        } else if (field === "arrivalAirport") {
            setArrivalAirport({ city: value, iata: "" });
        }

        if (value.length > 1) {
            getFilterAirports(value);
            setIsVisible(true);
            setActiveField(field);
        } else {
            setIsVisible(false);
        }
    };

    // Save selected city and IATA code
    const saveSelectedCity = (city, iata) => {
        if (activeField === "departureAirport") {
            setDepartureAirport({ city, iata });
            setErrors((prev) => ({ ...prev, departureAirport: "" }));
        } else if (activeField === "arrivalAirport") {
            setArrivalAirport({ city, iata });
            setErrors((prev) => ({ ...prev, arrivalAirport: "" }));
        }
        setIsVisible(false);
    };

    // Validate inputs
    const validate = () => {
        let valid = true;
        const newErrors = { departureAirport: "", arrivalAirport: "" };

        if (!departureAirport.city || !departureAirport.iata || !arrivalAirport.city || !arrivalAirport.iata) {
            newErrors.departureAirport = "Please select a valid departure and arrival airport";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    // Trigger setRoute callback when airports are updated
    useEffect(() => {
        setRoute({ departureAirport, arrivalAirport }); 2
    }, [departureAirport, arrivalAirport]);

    // Render individual airport item
    const Item = ({ city, iata }) => (
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
    );

    // Render filtered airport list
    const ResultList = () => (
        <View>
            <IconButton onPress={() => setFilteredAirports([])} icon="close" size={18} iconColor={colors.onSurface} style={{ display: filteredAirports.length > 0 ? "flex " : "none", position: "absolute", zIndex: 20, right: 0 }} />

            <FlatList
                data={filteredAirports}
                renderItem={({ item }) => <Item city={item.City} iata={item.IATA} />}
                keyExtractor={(item) => item.IATA}
                style={styles.container}
                keyboardShouldPersistTaps="always"
            />
        </View>
    );

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
                    outlineColor={errors.departureAirport ? colors.error : colors.outline}
                    right={<TextInput.Icon icon="airplane-takeoff" style={{ alignSelf: "baseline" }} size={18} />}

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
                    outlineColor={errors.arrivalAirport ? colors.error : colors.outline}
                    right={<TextInput.Icon icon="airplane-landing" style={{ alignSelf: "baseline" }} size={18} />}
                />

            </View>

            {errors.departureAirport && (
                <Txt style={{ color: colors.error, marginTop: 5 }}>
                    {errors.departureAirport}
                </Txt>
            )}

            {isVisible && <ResultList />}

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