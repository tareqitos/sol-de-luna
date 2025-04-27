import { View } from "react-native";
import { s } from "../../styles/card.style";
import { useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { Clock } from "lucide-react-native";
import { ConvertTimetoString } from "../../services/date-service";

export default function CardTime({ time, hasIcon = true }) {
    const { colors, typography } = useTheme()
    return (
        <View style={s.card.date}>
            {hasIcon && <Clock color={colors.primary} size={16} />}
            <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertTimetoString(time)}</Txt>
        </View>
    )
}