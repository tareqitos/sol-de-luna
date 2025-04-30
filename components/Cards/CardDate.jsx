import { View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { ConvertDateToString } from "../../services/date-service";

export default function CardDate({ hasIcon = true, date }) {
    const { colors, typography } = useTheme()
    return (
        <View style={s.card.date}>
            {hasIcon && <Icon source="calendar-blank-outline" color={colors.primary} size={16} />}
            <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertDateToString(date)}</Txt>
        </View>
    )
}