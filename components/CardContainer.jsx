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


const CardContainer = memo(({ category, pickDocument, openDocument, deleteDocument, style = {} }) => {
    const [isCollapsed, setIsCollapse] = useState(false)
    const { flights, hotels, transport, deleteData } = useData()
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
    const flightsContent = useMemo(() => {
        if (category === "flights") {
            if (flights.length === 0) {
                return <Txt style={typography.body}>No {category} added yet.</Txt>;
            }
            return flights.map((flight) => (
                <TouchableOpacity onLongPress={() => deleteData(flight)} activeOpacity={1} key={flight.id || `flight-${flight.from}-${flight.to}`} >
                    <FlightCard item={flight} pickDocument={pickDocument} openDocument={openDocument} deleteDocument={deleteDocument} />
                </TouchableOpacity>
            ));
        }

        return null;
    }, [flights, category]);

    const hotelsContent = useMemo(() => {
        if (category === "hotels") {
            if (hotels.length === 0) {
                return <Txt style={typography.body}>No {category} added yet.</Txt>;
            }

            return hotels.map((hotel) => (
                <TouchableOpacity onLongPress={() => deleteData(hotel)} activeOpacity={1} key={hotel.id || `hotel-${hotel.from}-${hotel.to}`} >
                    <HotelCard item={hotel} pickDocument={pickDocument} openDocument={openDocument} deleteDocument={deleteDocument} />
                </TouchableOpacity>
            ));
        }
    }, [hotels, category])

    const transportContent = useMemo(() => {
        if (category === "transport") {
            if (transport.length === 0) {
                return <Txt style={typography.body}>No {category} added yet.</Txt>;
            }

            return transport.map((trans) => (
                <TouchableOpacity onLongPress={() => deleteData(trans)} activeOpacity={1} key={trans.id || `trans-${trans.from}-${trans.to}`} >
                    <TransportCard item={trans} pickDocument={pickDocument} openDocument={openDocument} deleteDocument={deleteDocument} />
                </TouchableOpacity>
            ));
        }
    }, [transport, category])

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
                {flightsContent}
                {hotelsContent}
                {transportContent}
            </Collapsible>
        </View >
    )
});

export default CardContainer