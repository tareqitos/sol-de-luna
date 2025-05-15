import { TouchableOpacity, View } from "react-native";
import Txt from "../Utils/Txt";
import { s } from "../../styles/styles.style";
import { Icon, useTheme } from "react-native-paper";
const iconSize = 24;
export default function TabBottomMenu({ selectedTabName, onPress, t_categories }) {
    const { colors, typography } = useTheme();

    const tabs = [
        { name: "home", label: t_categories[3], icon: "home" },
        { name: "flights", label: t_categories[0], icon: "airplane" },
        { name: "hotels", label: t_categories[1], icon: "home-city" },
        { name: "transport", label: t_categories[2], icon: "car" },
    ];

    function getTextStyle(tabName) {
        return tabName === selectedTabName ? colors.primary : typography.caption.color;
    }

    return (
        <View style={[s.footer.container]}>
            {tabs.map(({ name, label, icon }) => (
                <TouchableOpacity key={name} onPress={() => onPress(name)} style={s.footer.tab} hitSlop={20}>
                    <Icon source={icon} color={getTextStyle(name)} size={iconSize} />
                    <Txt style={{ color: getTextStyle(name) }}>{label}</Txt>
                </TouchableOpacity>
            ))}
        </View>
    );
}
