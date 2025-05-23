import { StyleSheet, View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";

export default function CardRouteCity({ departure, arrival }) {
    const { colors, typography } = useTheme()
    return (
        <View>
            {departure.iata.length > 0 && departure.city.length > 0 &&
                <View style={[styles.row]}>
                    <Txt style={[typography.h5, { lineHeight: 15 }]}>{departure.city}</Txt>
                    <Icon
                        source="arrow-right-thin"
                        color={colors.primary}
                        size={18}
                        style={s.card.arrow} />
                    <Txt style={[typography.h5, { lineHeight: 15 }]}>{arrival.city}</Txt>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    }
})