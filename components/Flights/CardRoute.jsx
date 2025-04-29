import { StyleSheet, View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { MoveRight } from "lucide-react-native";

export default function CardRoute({ departure, arrival }) {
    const { colors, typography } = useTheme()
    return (
        <View>
            {departure.iata.length > 0 &&
                <View style={[s.card.destination_container, { borderWidth: 1, borderColor: colors.primary }]}>
                    <Txt style={[typography.h4]}>{departure.iata}</Txt>
                    <MoveRight
                        color={colors.primary}
                        size={18}
                        style={s.card.arrow} />
                    <Txt style={[typography.h4]}>{arrival.iata}</Txt>
                </View>}
            {departure.city.length > 0 &&
                <View style={[styles.row, { marginTop: departure.iata.length > 0 ? 10 : 0 }]}>
                    <Txt style={[typography.body, { lineHeight: 15 }]}>{departure.city}</Txt>
                    <MoveRight
                        color={colors.primary}
                        size={18}
                        style={s.card.arrow} />
                    <Txt style={[typography.body, { lineHeight: 15 }]}>{arrival.city}</Txt>
                </View>}
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