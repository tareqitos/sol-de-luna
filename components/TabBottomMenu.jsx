
import { TouchableOpacity, View } from "react-native";
import Txt from "./Txt";
import { CarIcon, HotelIcon, HouseIcon, PlaneIcon } from "lucide-react-native";
import { s } from "../styles/styles.style";
import { useTheme } from "react-native-paper";
const iconSize = 24;
export default function TabBottomMenu({ selectedTabName, onPress }) {
    const { colors, typography } = useTheme();

    const tabs = [
        { name: "home", label: "Home", Icon: HouseIcon },
        { name: "flights", label: "Flights", Icon: PlaneIcon },
        { name: "hotels", label: "Hotels", Icon: HotelIcon },
        { name: "transport", label: "Transport", Icon: CarIcon },
    ];

    function getTextStyle(tabName) {
        return tabName === selectedTabName ? colors.primary : typography.caption.color;
    }

    return (
        <View style={[s.footer.container]}>
            {tabs.map(({ name, label, Icon }) => (
                <TouchableOpacity key={name} onPress={() => onPress(name)} style={s.footer.tab} hitSlop={20}>
                    <Icon color={getTextStyle(name)} size={iconSize} />
                    <Txt style={{ color: getTextStyle(name) }}>{label}</Txt>
                </TouchableOpacity>
            ))}
        </View>
    );
}
