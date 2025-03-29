import { TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Txt from "./Txt";
import { s } from "../styles/card.style";
import { useTheme } from "../hook/theme";
import CollapseButton from "./CollapseButton";
import { Plane } from "lucide-react-native";
import { useState } from "react";
import FlightCard from "./FlightCard";
import { useNavigation } from "@react-navigation/native";

export default function CardContainer({ data, pickDocument }) {
    const [isCollapsed, setIsCollapse] = useState(true)
    const nav = useNavigation();
    const { colors } = useTheme()

    function handleCollapsible() {
        setIsCollapse(!isCollapsed);
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={handleCollapsible} style={[s.card_container.container, { backgroundColor: colors.background }]}>
            <View style={s.card_container.title_container}>
                <View style={s.card_container.title}>
                    <View style={s.card.plane_icon_container}>
                        <Plane
                            color={colors.card.icon}
                            size={18}
                            style={s.card.plane_icon} />
                    </View>
                    <Txt style={{ fontSize: 20 }}>Flights</Txt>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[s.card_container.add_item, { borderColor: colors.border }]}
                        onPress={() => nav.push("AddFlight")}
                    >
                        <Txt style={{ color: colors.border }}>+ Add flight</Txt>
                    </TouchableOpacity>
                </View>
                <CollapseButton isCollapsed={isCollapsed} />
            </View>
            <Collapsible style={s.card_container.collapsible} collapsed={isCollapsed} collapsedHeight={0} duration={300} >
                {data.map((flight) => (
                    <FlightCard key={flight.id} data={flight} onPress={pickDocument} />
                ))}
            </Collapsible>
        </TouchableOpacity>

    )
}