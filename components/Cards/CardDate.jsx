import { View } from "react-native";
import { s } from "../../styles/card.style";
import { useTheme } from "react-native-paper";
import Txt from "../Txt";
import { Calendar } from "lucide-react-native";
import { ConvertDateToString } from "../../services/date-service";

export default function CardDate({ hasIcon = true, date }) {
    const { colors, typography } = useTheme()
    return (
        <View style={s.card.date}>
            {hasIcon && <Calendar color={colors.primary} size={16} />}
            <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertDateToString(date)}</Txt>
        </View>
    )
}