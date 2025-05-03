import { View } from "react-native";
import { s } from "../../styles/card.style";
import { Icon, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { ConvertDateToString } from "../../services/date-service";
import { useLocalization } from "../../hook/localization";

export default function CardDate({ hasIcon = true, date }) {
    const { colors, typography } = useTheme()
    const { selected } = useLocalization();
    return (
        <View style={s.card.date}>
            {hasIcon && <Icon source="calendar-blank-outline" color={colors.primary} size={16} />}
            <Txt style={[s.card.date, typography.caption, { color: colors.onBackground }]}>{ConvertDateToString(date, selected.tag)}</Txt>
        </View>
    )
}