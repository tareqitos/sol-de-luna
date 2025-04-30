import { Platform, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Txt from "./Utils/Txt";
import { s } from "../styles/card.style";
import CollapseButton from "./UI/CollapseButton";
import { memo, useCallback, useMemo, useState } from "react";
import FlightCard from "./Flights/FlightCard";
import 'react-native-get-random-values';
import { useData } from "../hook/data";
import { Icon, useTheme } from "react-native-paper";
import HotelCard from "./Hotels/HotelCard";
import TransportCard from "./Transport/TransportCard";
import DialogPopUp from "./UI/Dialog";


const CardContainer = memo(({ category, destination, style = {} }) => {
    const [isCollapsed, setIsCollapse] = useState(false)
    const { deleteItem } = useData()
    const { colors, typography } = useTheme()

    const [itemToDelete, setItemToDelete] = useState();
    const [dialogVisible, setDialogVisible] = useState(false)

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, [])

    const categoryIcon = () => {
        switch (category) {
            case "flights":
                return <Icon source="airplane" color={colors.primary} size={24} />;
            case "hotels":
                return <Icon source="home-city" color={colors.primary} size={24} />;
            case "transport":
                return <Icon source="car" color={colors.primary} size={24} />;
            default:
                return null;
        }
    };

    const handleDeleteItem = (item) => {
        setItemToDelete(item)
        setDialogVisible(true)
    }

    const deleteConfirm = () => {
        deleteItem(destination.id, itemToDelete)
        closeDialog()
    }

    const closeDialog = () => {
        setDialogVisible(false);
        setItemToDelete(null);
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
                onLongPress={() => Platform.OS === "android" ? handleDeleteItem(item) : deleteItem(destination.id, item)}
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
            <DialogPopUp
                visible={dialogVisible}
                onDismiss={closeDialog}
                title="Delete card"
                content={<Txt>Do you want to delete this card?</Txt>}
                cancel={closeDialog}
                validate={deleteConfirm}
                validateText="Confirm"
            />

        </View >
    )
});

export default CardContainer