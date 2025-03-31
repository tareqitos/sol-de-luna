import { TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Txt from "./Txt";
import { s } from "../styles/card.style";
import { useTheme } from "../hook/theme";
import CollapseButton from "./CollapseButton";
import { Car, Hotel, Plane } from "lucide-react-native";
import { memo, useCallback, useMemo, useState } from "react";
import FlightCard from "./FlightCard";
import { useNavigation } from "@react-navigation/native";
import 'react-native-get-random-values';

const CardContainer = memo(({ category, items, style = {} }) => {
    const [isCollapsed, setIsCollapse] = useState(false)
    const nav = useNavigation();
    const { colors } = useTheme()

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, [])

    const goToAddItem = () => {
        const navPath =
            category === "flights" ? "AddFlight" :
                category === "hotels" ? "AddHotel" :
                    category === "transport" ? "AddTransport" : "";

        nav.navigate(navPath);
    };

    const categoryIcon = () => {
        switch (category) {
            case "hotels":
                return <Hotel color={colors.card.icon} size={24} />;
            case "flights":
                return <Plane color={colors.card.icon} size={24} />;
            case "transport":
                return <Car color={colors.card.icon} size={24} />;
            default:
                return null;
        }
    };

    // Memoize the card content to prevent re-renders
    const cardContent = useMemo(() => {
        if (!items || items.length === 0) {
            return <Txt style={{ color: colors.grey }}>No {category} added yet.</Txt>;
        }

        if (category === "flights") {
            return items.map((flight) => (
                <FlightCard key={flight.id || `flight-${flight.from}-${flight.to}`} data={flight} />
            ));
        }

        return null;
    }, [items, category, colors.grey]);

    return (
        <TouchableOpacity activeOpacity={1} onPress={handleCollapsible} style={[s.card_container.container, style, { backgroundColor: colors.background }]}>
            <View style={s.card_container.title_container}>
                <View style={s.card_container.title}>
                    <View style={s.card.icon_container}>
                        {categoryIcon()}
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
            <Collapsible style={s.card_container.collapsible} collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true} >
                {cardContent}
            </Collapsible>
        </TouchableOpacity >
    )
});

export default CardContainer