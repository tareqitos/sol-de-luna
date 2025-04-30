import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, List, TextInput, useTheme } from "react-native-paper";
import { API } from "../../api/api";

export default function IataInput({ label, city, setCity }) {
    const { colors, typography } = useTheme();

    const [airports, setAirports] = useState({});
    const [filteredAirports, setFilteredAirports] = useState();
    const [departure, setDeparture] = useState();
    const [value, setValue] = useState()

    const [isVisible, setIsVisible] = useState(false)

    const getIataApi = async () => {
        try {
            const result = await API.getIATA()
            setAirports(result);

        } catch (error) {
            console.log("Error fetching API")
        }
    }


    const saveSelectedCity = (city, iata) => {
        setDeparture({ city: city, iata: iata })
        setValue(city)
        setIsVisible(false)
    }
    console.log(departure)


    useEffect(() => {
        getIataApi();
    }, [])

    const getFilterAirports = (value) => {
        const filteredAirports = Object.values(airports).filter((airport) =>
            airport.City.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAirports(filteredAirports);
    }

    const showList = (value) => {
        setValue(value);
        if (value.length > 0) {
            getFilterAirports(value);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const Item = ({ city, iata }) => (
        <View>
            <TouchableOpacity onPress={() => saveSelectedCity(city, iata)} activeOpacity={.5} style={[{ backgroundColor: colors.surface }]}>
                <List.Item
                    title={`${city} - ${iata}`}
                    style={[styles.item, typography.body]}
                />
            </TouchableOpacity>
            <Divider />
        </View>
    )

    const ResultList = () => {
        return (
            <View>
                <FlatList
                    data={filteredAirports}
                    renderItem={({ item }) => <Item city={item.City} iata={item.IATA} />}
                    keyExtractor={item => item.IATA}
                    style={styles.container}
                />
            </View>
        )
    }

    return (
        <>
            <TextInput
                label="City"
                mode="flat"
                value={value}
                onChange={(e) => showList(e.nativeEvent.text)}
                style={{ backgroundColor: "none" }}
            />
            {isVisible && <ResultList />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        maxHeight: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    item: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5
    },
})