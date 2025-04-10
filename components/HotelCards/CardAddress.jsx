import { StyleSheet, View } from "react-native";
import Txt from "../Txt";
import { IconButton, useTheme } from "react-native-paper";
import { showLocation } from "react-native-map-link";

export default function CardAddress({ address }) {
    const { colors, typography, elevation } = useTheme()

    const openMapApp = () => {
        showLocation({
            latitude: "",
            longitude: "",
            title: address,
            address: address
        })
    }

    return (
        <View style={[styles.container, elevation.level1, { backgroundColor: colors.surface }]}>
            <Txt style={[typography.body, { width: 200 }]}>{address}</Txt>
            <IconButton
                icon="map-search-outline"
                mode="contained"
                size={18}
                iconColor={colors.onPrimary}
                containerColor={colors.primary}
                onPress={openMapApp}
            />
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