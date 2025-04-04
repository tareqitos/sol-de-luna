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


const CardContainer = memo(({ category, pickDocument, openDocument, deleteDocument, style = {} }) => {
    const [isCollapsed, setIsCollapse] = useState(false)
    const { flights, deleteData } = useData()
    const nav = useNavigation();
    const { colors, typography } = useTheme()

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
    const cardContent = useMemo(() => {
        if (!flights || flights.length === 0) {
            return <Txt style={{ color: colors.onSurface }}>No {category} added yet.</Txt>;
        }

        if (category === "flights") {
            return flights.map((flight) => (
                <TouchableOpacity onLongPress={() => deleteData(flight)} activeOpacity={1} key={flight.id || `flight-${flight.from}-${flight.to}`} >
                    <FlightCard item={flight} pickDocument={pickDocument} openDocument={openDocument} deleteDocument={deleteDocument} />
                </TouchableOpacity>
            ));
        }

        return null;
    }, [flights, category, colors.onSurface]);

    return (
        <View style={[s.card_container.container, style, { backgroundColor: colors.surface }]}>
            <View style={s.card_container.title_container}>
                <View style={s.card_container.title}>
                    <View style={s.card.icon_container}>
                        {categoryIcon()}
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[s.card_container.add_item, { borderColor: colors.primary }]}
                        onPress={goToAddItem}
                    >
                        <PlusIcon color={colors.primary} size={typography.body.fontSize} />
                        <Txt style={[typography.body, { fontFamily: "Raleway-SemiBold", color: colors.primary, lineHeight: 18 }]}>
                            add {category}
                        </Txt>
                    </TouchableOpacity>
                </View>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>
            <Collapsible style={s.card_container.collapsible} collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true} >
                {cardContent}
            </Collapsible>
        </View>
    )
});

export default CardContainer