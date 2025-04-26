import { StyleSheet, View } from "react-native";
import Txt from "../Txt";
import { IconButton, useTheme } from "react-native-paper";
import { showLocation } from "react-native-map-link";

export default function CardAddress({ item }) {
    const { colors, typography, elevation } = useTheme()

    const openMapApp = () => {
        showLocation({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.address,
            address: !item.latitude ? item.address : null
        })
    }

    return (
        <View>
            <View style={[styles.container, elevation.level1, { backgroundColor: colors.surface }]}>
                <Txt style={[typography.body, { width: 200 }]}>{item.address}</Txt>
                <IconButton
                    icon="map-search-outline"
                    mode="contained"
                    size={18}
                    iconColor={colors.onPrimary}
                    containerColor={colors.primary}
                    onPress={openMapApp}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: 10,
        borderRadius: 5
    }
})