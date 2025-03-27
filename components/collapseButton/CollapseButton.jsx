import { ChevronDown, ChevronUp } from "lucide-react-native";
import { TouchableOpacity } from "react-native";


export default function CollapseButton({ onPress, isCollapsed }) {

    function ChevronButtonIcon() {
        return isCollapsed ?
            <ChevronDown color="#647457" size={18} /> :
            <ChevronUp color="#647457" size={18} />
    }

    return (
        <TouchableOpacity onPress={onPress} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
            <ChevronButtonIcon />
        </TouchableOpacity>
    )
}