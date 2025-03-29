
import { TouchableOpacity, View } from "react-native";
import Txt from "./Txt";
import { CarIcon, HotelIcon, HouseIcon, PlaneIcon } from "lucide-react-native";
import { useTheme } from "../hook/theme";
import { s } from "../styles/styles.style";
const iconSize = 25;

export default function TabBottomMenu({ selectedTabName, onPress }) {
    const { colors } = useTheme();

    function getTextStyle(tabName) {
        return tabName === selectedTabName ? colors.iconSelected : colors.iconGrey
    }

    return (
        <View style={s.footer.container}>
            <TouchableOpacity onPress={() => onPress("home")} style={s.footer.tab}>
                <HouseIcon color={getTextStyle("home")} size={iconSize} />
                <Txt style={{ color: getTextStyle("home") }}>Home</Txt>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("flights")} style={s.footer.tab}>
                <PlaneIcon color={getTextStyle("flights")} size={iconSize} />
                <Txt style={{ color: getTextStyle("flights") }}>Flights</Txt>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("hotels")} style={s.footer.tab}>
                <HotelIcon color={getTextStyle("hotels")} size={iconSize} />
                <Txt style={{ color: getTextStyle("hotels") }}>Hotels</Txt>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("transport")} style={s.footer.tab}>
                <CarIcon color={getTextStyle("transport")} size={iconSize} />
                <Txt style={{ color: getTextStyle("transport") }}>Transport</Txt>
            </TouchableOpacity>
        </View>
    )
}