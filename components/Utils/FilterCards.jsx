import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { IconButton, Tooltip, useTheme } from "react-native-paper";
import { TOOLTIPS } from "../../locales/languagesConst";

export default function FilterCards({ dateAsc, nameAsc, showComplete, filterByName, filterByDate, filterOutCompletedCard }) {
    const { colors } = useTheme()
    const { t } = useTranslation();

    return (
        <View style={{ flexDirection: "row", padding: 0 }}>
            <Tooltip title={t(TOOLTIPS.SHOW_HIDE_COMPLETED)} leaveTouchDelay={100}>
                <IconButton
                    icon="passport-biometric"
                    size={22}
                    onPress={filterOutCompletedCard}
                    animated
                    iconColor={showComplete ? colors.primary : colors.grey}
                    style={{ margin: 0 }}
                />
            </Tooltip>

            <Tooltip title={t(TOOLTIPS.SORT_BY_NAME)} leaveTouchDelay={100}>
                <IconButton
                    icon={nameAsc ? "sort-alphabetical-ascending" : "sort-alphabetical-descending"}
                    size={22}
                    onPress={filterByName}
                    animated
                    iconColor={colors.primary}
                    style={{ margin: 0 }}
                />
            </Tooltip>

            <Tooltip title={t(TOOLTIPS.SORT_BY_DATE)} leaveTouchDelay={100}>
                <IconButton
                    icon={dateAsc ? "sort-clock-ascending-outline" : "sort-clock-descending-outline"}
                    size={22}
                    onPress={filterByDate}
                    animated
                    iconColor={colors.primary}
                    style={{ margin: 0 }}
                />
            </Tooltip>
        </View>
    )
}