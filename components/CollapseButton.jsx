import { ChevronDown, ChevronUp } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";


export default function CollapseButton({ onPress, isCollapsed }) {
    const { colors } = useTheme()

    function ChevronButtonIcon() {
        return isCollapsed ?
            <ChevronDown color={colors.primary} size={18} /> :
            <ChevronUp color={colors.primary} size={18} />
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} hitSlop={20}>
            <ChevronButtonIcon />
        </TouchableOpacity>
    )
}