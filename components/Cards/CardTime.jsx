import { View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { ConvertTimeToString } from "../../services/date-service";

export default function CardTime({ time, hasIcon = true }) {
    const { colors, typography } = useTheme()
    return (
        <View style={s.card.date}>
            {hasIcon && <Icon source="clock-outline" color={colors.primary} size={16} />}
            <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertTimeToString(time)}</Txt>
        </View>
    )
}