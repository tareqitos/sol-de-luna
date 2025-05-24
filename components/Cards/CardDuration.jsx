import { View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { calculateDuration } from "../../services/date-service";

export default function CardDuration({ icon, duration, hasIcon = true }) {
    const { colors, typography } = useTheme()

    return (
        <View style={s.card.date}>
            {hasIcon && <Icon source={icon || "clock-outline"} color={colors.primary} size={16} />}
            {/* {duration.days > 0 && <Txt style={[s.card.date, typography.bodyInter, { color: colors.onBackground }]}>{duration.days + "d"}</Txt>} */}
            {duration.hours > 0 && <Txt style={[s.card.date, typography.bodyInter, { color: colors.onBackground }]}>{duration.hours + "h"}</Txt>}
            <Txt style={[s.card.date, typography.bodyInter, { color: colors.onBackground }]}>{duration.minutes + "m"}</Txt>
        </View>
    )
}