import { TouchableOpacity } from "react-native";
import { Icon, useTheme } from "react-native-paper";


export default function CollapseButton({ onPress, isCollapsed }) {
    const { colors } = useTheme()

    function ChevronButtonIcon() {
        return isCollapsed ?
            <Icon source="chevron-down" color={colors.primary} size={18} /> :
            <Icon source="chevron-up" color={colors.primary} size={18} />
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} hitSlop={20}>
            <ChevronButtonIcon />
        </TouchableOpacity>
    )
}