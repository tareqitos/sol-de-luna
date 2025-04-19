import { View } from "react-native";
import { s } from "../../styles/card.style";
import { useTheme } from "react-native-paper";
import Txt from "../Txt";
import { MoveRight } from "lucide-react-native";

export default function CardRoute({ departure, arrival }) {
    const { colors, typography } = useTheme()
    return (
        <View style={[s.card.destination_container, { borderWidth: 1, borderColor: colors.primary }]}>
            <Txt style={[s.card.iata, typography.h4]}>{departure.iata}</Txt>
            <MoveRight
                color={colors.primary}
                size={14}
                style={s.card.arrow} />
            <Txt style={[s.card.iata, typography.h4]}>{arrival.iata}</Txt>
        </View>
    )
}