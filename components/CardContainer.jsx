import { TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Txt from "./Txt";
import { s } from "../styles/card.style";
import CollapseButton from "./CollapseButton";
import { Car, Hotel, Plane, PlusIcon } from "lucide-react-native";
import { memo, useCallback, useMemo, useState } from "react";
import FlightCard from "./FlightCard";
import { useNavigation } from "@react-navigation/native";
import 'react-native-get-random-values';
import { useData } from "../hook/data";
import { useTheme } from "react-native-paper";
import HotelCard from "./HotelCard";
import TransportCard from "./TransportCard";


const CardContainer = memo(({ category, destination, style = {} }) => {
    const [isCollapsed, setIsCollapse] = useState(false)
    const { flights, hotels, transport, deleteItem } = useData()
    const nav = useNavigation();
    const { colors, typography } = useTheme()


    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, [])

    const categoryIcon = () => {
        switch (category) {
            case "hotels":
                return <Hotel color={colors.primary} size={24} />;
            case "flights":
                return <Plane color={colors.primary} size={24} />;
            case "transport":
                return <Car color={colors.primary} size={24} />;
            default:
                return null;
        }
    };

    // Memoize the card content to prevent re-renders
    const categoryContent = useMemo(() => {
        const dataMap = {
            flights: destination.flights,
            hotels: destination.hotels,
            transport: destination.transport,
        };

        const cardMap = {
            flights: FlightCard,
            hotels: HotelCard,
            transport: TransportCard,
        };

        const data = dataMap[category];
        const CardComponent = cardMap[category];

        if (!CardComponent) return null;

        if (!data || data.length == 0) {
            return <Txt style={typography.body}>No {category} added yet.</Txt>;
        }

        return data.map((item) => (
            <TouchableOpacity
                onLongPress={() => deleteItem(destination.id, item)}
                activeOpacity={1}
                key={item.id || `${category}-${item.from}-${item.to}`}
            >
                <CardComponent
                    item={item} destination={destination}
                />
            </TouchableOpacity>
        ));
    }, [destination, category, deleteItem]);

    return (

        <View style={[s.card_container.container, style, { backgroundColor: colors.surface }]}>
            <View style={s.card_container.title_container}>
                <View style={s.card_container.title}>
                    <View style={s.card.icon_container}>
                        {categoryIcon()}
                    </View>
                    <Txt style={[typography.h3, { color: colors.primary }]}>{category}</Txt>
                </View>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>
            <Collapsible style={s.card_container.collapsible} collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true} >
                {categoryContent}
            </Collapsible>
        </View >
    )
});

export default CardContainer