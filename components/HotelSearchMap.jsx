import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Button, IconButton, TextInput, TouchableRipple, useTheme } from "react-native-paper";
import Txt from "./Txt";
import { s } from "../styles/hotel.style";
import { API } from "../api/api";

export default function HotelSearchMap({ query, setQuery, setCoords }) {

    const [results, setResults] = useState([]);
    const { colors, typography } = useTheme();

    // REPLACE WITH OPENSTREETMAP
    const searchHotel = async () => {
        try {
            const data = await API.fetchAddressFromQuery(query);
            console.log(data);
            setResults(data)

        } catch (error) {
            console.log("Could not fetch the api", error)
        }
    }

    const handleSelectedAddress = (lat, lon, address) => {
        if (lat && lon) {
            setCoords({
                latitude: lat,
                longitude: lon
            })

            setQuery(address)
        }
        setResults([])
    }

    return (
        <>
            <View style={s.addhotel.search}>
                <TextInput
                    label="Search for a hotel..."
                    value={query}
                    onChangeText={setQuery}
                    mode="outlined"
                    outlineColor={typography.caption.color}
                    style={s.addhotel.input}
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
            <FlatList
                data={results}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableRipple
                        onPress={() => handleSelectedAddress(item.lat, item.lon, item.display_name)}
                        rippleColor="rgba(255, 255, 255, .32)"
                    >
                        <Txt style={[s.addhotel.result, { color: colors.onSurface }]}>
                            {item.display_name}
                        </Txt>
                    </TouchableRipple>
                )}
                style={{ marginTop: 10 }}
            />
        </>
    )
}