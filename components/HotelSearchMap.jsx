import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, List, TextInput, useTheme } from "react-native-paper";
import Txt from "./Txt";
import { s } from "../styles/hotel.style";
import { API } from "../api/api";

export default function HotelSearchMap({ query, setQuery, setCoords }) {

    const [results, setResults] = useState([]);
    const [message, setMessage] = useState(null)
    const { colors, typography } = useTheme();

    const searchHotel = async () => {
        try {
            const data = await API.getAddressFromQuery(query || "");
            console.log(data)
            if (data.length > 0) {
                setResults(data)
                console.log(data[0].display_name)
            } else {
                setMessage("Address not found, tap here to add manually")
                setResults([])
            }

        } catch (error) {
            console.log("Could not fetch the api", error)
        }
    }

    const handleSelectedAddress = async (lat, lon, address) => {
        if (lat && lon) {
            setCoords({
                latitude: lat,
                longitude: lon
            })

            await setQuery(address)
            console.log(address)
        }
        setResults([])
    }

    const handleManualInput = () => {
        if (!query || query.trim().length < 3) {
            console.log("Manual input is invalid. Please enter a valid address.");
            return;
        }

        setCoords({ latitude: null, longitude: null });
        setMessage("Address added!")
        console.log("Manual address accepted:", query);
        setResults([]);
    };

    const Item = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => handleSelectedAddress(item.lat, item.lon, item.display_name)}
                activeOpacity={1}
                style={[{ backgroundColor: colors.surface }]}
            >
                <List.Item
                    title={item.display_name}
                    contentStyle={[styles.item, typography.body]}
                    titleNumberOfLines={2}
                />
            </TouchableOpacity>
            <Divider />
        </View>
    )

    const ResultList = () => (
        <View>
            <FlatList
                data={results}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => <Item item={item} />}
                style={styles.container}
            />
            {query &&
                <TouchableOpacity onPress={handleManualInput}>
                    <Txt style={{ color: colors.primary }}>{message}</Txt>
                </TouchableOpacity>
            }

        </View>
    )

    return (
        <>
            <View style={styles.searchContainer}>
                <TextInput
                    label="Address..."
                    value={query}
                    onChangeText={setQuery}
                    mode="flat"
                    inputMode="search"
                    onSubmitEditing={searchHotel}
                    outlineColor={typography.caption.color}
                    autoCorrect={false}
                    style={[
                        styles.input,
                        query?.length > 0 ? typography.body : typography.caption,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}
                    right={<TextInput.Icon icon="close" size={18} onPress={() => setQuery("")} />}
                />
                <IconButton
                    icon="magnify"
                    iconColor={colors.onPrimary}
                    onPress={searchHotel}
                    size={24}
                    mode="contained"
                    style={[s.icon_button, { backgroundColor: colors.primary }]}
                />
            </View>

            <ResultList />
        </>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row", alignItems: "center", gap: 5,
    },

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