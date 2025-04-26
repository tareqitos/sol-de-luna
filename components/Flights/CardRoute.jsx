import { StyleSheet, View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { MoveRight } from "lucide-react-native";

export default function CardRoute({ departure, arrival }) {
    const { colors, typography } = useTheme()
    return (
        <View>
            <View style={[s.card.destination_container, { borderWidth: 1, borderColor: colors.primary }]}>
                <Txt style={[s.card.iata, typography.h4]}>{departure.iata}</Txt>
                <MoveRight
                    color={colors.primary}
                    size={18}
                    style={s.card.arrow} />
                <Txt style={[s.card.iata, typography.h4]}>{arrival.iata}</Txt>
            </View>
            <View style={[styles.row, { marginTop: 5, opacity: .5 }]}>
                <Txt style={[s.card.iata, typography.body]}>{departure.city}</Txt>
                <Icon source="arrow-right-thin" size={18} />
                <Txt style={[s.card.iata, typography.body]}>{arrival.city}</Txt>
            </View>
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