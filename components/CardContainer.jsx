import { Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Txt from "./Txt";
import { s } from "../styles/card.style";
import { useTheme } from "../hook/theme";
import CollapseButton from "./CollapseButton";
import { Car, Hotel, HotelIcon, Plane } from "lucide-react-native";
import { useState } from "react";
import FlightCard from "./FlightCard";
import { useNavigation } from "@react-navigation/native";

export default function CardContainer({ data, category, pickDocument }) {
    const [isCollapsed, setIsCollapse] = useState(true)
    const nav = useNavigation();
    const { colors } = useTheme()

    function handleCollapsible() {
        setIsCollapse(!isCollapsed);
    }

    function goToAddItem() {
        const navPath =
            category == "flights" ? "AddFlight" :
                category == "hotels" ? "AddHotel" :
                    category == "transport" ? "AddTransport" : ""

        nav.navigate(navPath, { data })
    }

    function CategoryIcon(category) {
        switch (category) {
            case "hotels":
                return <Hotel color={colors.card.icon} size={24} />;
            case "flights":
                return <Plane color={colors.card.icon} size={24} />;
            case "transport":
                return <Car color={colors.card.icon} size={24} />;
            default:
                return null
        }
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={handleCollapsible} style={[s.card_container.container, { backgroundColor: colors.background }]}>
            <View style={s.card_container.title_container}>
                <View style={s.card_container.title}>
                    <View style={s.card.icon_container}>
                        {CategoryIcon(category)}
                    </View>
                    <Txt style={{ fontSize: 20 }}></Txt>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[s.card_container.add_item, { borderColor: colors.border }]}
                        onPress={goToAddItem}
                    >
                        <Txt style={{ color: colors.border }}>+ Add {category}</Txt>
                    </TouchableOpacity>
                </View>
                <CollapseButton isCollapsed={isCollapsed} />
            </View>
            <Collapsible style={s.card_container.collapsible} collapsed={isCollapsed} collapsedHeight={0} duration={300} >
                {data.length === 0 ? (
                    <Txt style={{ color: colors.grey }}>No {category} added yet.</Txt>
                ) : (
                    category == "flights" && data && data.map((flight) => (
                        <FlightCard key={flight.id} data={flight} />
                    ))
                )
                }
            </Collapsible>
        </TouchableOpacity >
    )
}
