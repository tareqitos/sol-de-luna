import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, List, TextInput, useTheme } from "react-native-paper";
import { API } from "../../api/api";
import { FORM } from "../../locales/languagesConst";

export default function HotelSearchMap({ editMode, query, setQuery, setCoords, closeKeyboard, label, placeholder, t }) {

    const [results, setResults] = useState([]);
    const [message, setMessage] = useState(t(FORM.HOTEL_ADD_ADDRESS_MANUALLY))
    const { colors, typography } = useTheme();

    const isAddressSelected = useRef(false);
    const hasQuery = useRef(editMode);

    const searchHotel = async () => {
        try {
            const data = await API.getAddressFromQuery(query || "");
            if (data.length > 0) {
                setResults(data)
            } else {
                setMessage(t(FORM.HOTEL_ADD_ADDRESS_MANUALLY))
                setResults([])
            }

        } catch (error) {
            console.log("Could not fetch the api", error)
        }
    }

    const handleSelectedAddress = useCallback(async (lat, lon, address) => {
        if (lat && lon) {
            setCoords({
                latitude: lat,
                longitude: lon
            })

            isAddressSelected.current = true;
            await setQuery(address)
            console.log(address)
        }
        closeKeyboard();
        setResults([])

    }, [query])

    const Item = memo(({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => handleSelectedAddress(item.lat, item.lon, item.display_name)}
                activeOpacity={1}
                style={[{ backgroundColor: colors.surface }]}
            >
                <List.Item
                    title={item.display_name}
                    contentStyle={[typography.body, styles.item]}
                    titleNumberOfLines={2}
                />
            </TouchableOpacity>
            <Divider />
        </View>
    ))

    const ResultList = useMemo(() => {
        if (results.length === 0) return null;

        return (
            <>
                <View>
                    {results.length > 0 && (
                        <IconButton
                            onPress={() => setResults([])}
                            icon="close"
                            size={18}
                            iconColor={colors.onSurface}
                            style={Platform.OS === "ios" ? { backgroundColor: colors.surface, width: "auto" } : { position: "absolute", zIndex: 200, right: 0 }}
                        />
                    )}
                </View>
                <View>

                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => <Item item={item} />}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews={true}
                        style={Platform.OS === 'ios' ? styles.containerIOS : styles.container}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </>
        )
    }, [results])

    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const delayAPICall = () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(async () => {
            await searchHotel();
        }, 1000);

        setDebounceTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        }
    }, [])

    useEffect(() => {
        if (query.trim().length > 2 && !isAddressSelected.current) {
            if (hasQuery.current) {
                hasQuery.current = false;
                return;
            }

            delayAPICall();
        } else {
            setResults([])
        }

    }, [query])

    return (
        <>
            <View style={styles.searchContainer}>
                <TextInput
                    label={label}
                    value={query}
                    onChange={() => isAddressSelected.current = false}
                    onChangeText={setQuery}
                    mode={Platform.OS === "android" ? "outlined" : "flat"}
                    outlineColor={typography.caption.color}
                    autoCorrect={false}
                    inputMode="search"
                    returnKeyType="search"
                    returnKeyLabel="search"
                    placeholder={placeholder}
                    style={[
                        styles.input,
                        query?.length > 0 ? typography.body : typography.caption,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}
                    right={<TextInput.Icon icon="close" forceTextInputFocus={false} size={18}
                        onPress={() => {
                            isAddressSelected.current = false
                            setQuery("")
                            setResults([]);
                        }} />}
                />
            </View>

            {ResultList}
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
        fontSize: 14,
    },
    input: {
        flex: 1,
        paddingHorizontal: 0
    },
});