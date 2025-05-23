import { View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { calculateDuration } from "../../services/date-service";

export default function CardDuration({ icon, departureTime, arrivalTime, hasIcon = true }) {
    const { colors, typography } = useTheme()
    const duration = calculateDuration(departureTime, arrivalTime)

    return (
        <View style={s.card.date}>
            {hasIcon && <Icon source={icon || "clock-outline"} color={colors.primary} size={16} />}
            <Txt style={[s.card.date, typography.bodyInter, { color: colors.onBackground }]}>{duration.hours + "h" + duration.minutes + "m"}</Txt>
        </View>
    )
}