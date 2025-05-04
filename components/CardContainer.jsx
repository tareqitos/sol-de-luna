import { Animated, Platform, TouchableOpacity, Vibration, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Txt from "./Utils/Txt";
import { s } from "../styles/card.style";
import CollapseButton from "./UI/CollapseButton";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import FlightCard from "./Flights/FlightCard";
import 'react-native-get-random-values';
import { useData } from "../hook/data";
import { Icon, useTheme } from "react-native-paper";
import HotelCard from "./Hotels/HotelCard";
import TransportCard from "./Transport/TransportCard";
import DialogPopUp from "./UI/Dialog";
import { useTranslation } from "react-i18next";
import { MESSAGES } from "../locales/languagesConst";
import { getScaleValue, handlePressIn, handlePressOut } from "../services/animation-service";
import FilterCards from "./Utils/FilterCards";
import { filteredDataByDateAsc, filteredDataByDateDesc, filteredDataByNameAsc, filteredDataByNameDesc } from "../services/sort-service";
import SearchCard from "./SearchCard";


const CardContainer = memo(({ category, destination, t_categories, style = {} }) => {
    const [isCollapsed, setIsCollapse] = useState(false)
    const { deleteItem } = useData()
    const { colors, typography } = useTheme()
    const { t } = useTranslation();

    const [itemToDelete, setItemToDelete] = useState();
    const [dialogVisible, setDialogVisible] = useState(false)
    const [data, setData] = useState([])

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, [])

    const t_category = {
        flights: t_categories[0],
        hotels: t_categories[1],
        transport: t_categories[2]
    }

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

    // DELETE ITEM FUNCTIONS

    const handleDeleteItem = (item) => {
        Vibration.vibrate(20)
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

    // FILTER DATA FUNCTIONS
    const [dateAsc, setDateAsc] = useState(true)
    const [nameAsc, setNameAsc] = useState(false)

    const handleFilterByDate = () => {
        if (dateAsc) {
            setData(filteredDataByDateDesc(data))
            setDateAsc(false)
        } else {
            setData(filteredDataByDateAsc(data))
            setDateAsc(true)
        }
    }

    const handleFilterByName = () => {
        if (!nameAsc) {
            setData(filteredDataByNameAsc(data))
            setNameAsc(true)
        } else {
            setData(filteredDataByNameDesc(data))
            setNameAsc(false)
        }
    }


    useEffect(() => {
        if (destination && destination[category]) {
            setData(destination[category]);
        }
    }, [destination, category]);



    // Memoize the card content to prevent re-renders
    const categoryContent = useMemo(() => {

        const cardMap = {
            flights: FlightCard,
            hotels: HotelCard,
            transport: TransportCard,
        };

        const CardComponent = cardMap[category];


        if (!CardComponent) return null;

        if (!data || data.length == 0) {
            return <Txt style={typography.body}>{t(MESSAGES.EMPTY_CATEGORY_MESSAGE) + t_category[category].toLowerCase() + '.'}</Txt>;
        }
        // console.log("DAAAAAAAATAAAAAAAAA: ", data)

        return data && data.map((item) => {
            const scaleValue = getScaleValue(item.id);

            return (
                <Animated.View
                    key={item.id}
                    style={{ transform: [{ scale: scaleValue }] }} // Apply scale transformation
                >
                    <TouchableOpacity
                        onPressIn={() => handlePressIn(1.05, item.id)}
                        onPressOut={() => handlePressOut(item.id)}
                        onLongPress={() => Platform.OS === "android" ? handleDeleteItem(item) : deleteItem(destination.id, item)}
                        activeOpacity={1}
                    >
                        <CardComponent
                            item={item} destination={destination}
                        />
                    </TouchableOpacity>
                </Animated.View>
            )
        });
    }, [destination, category, deleteItem, data, dateAsc, nameAsc]);

    return (
        <>
            <View style={{ marginBottom: 20 }}>
                <SearchCard
                    setData={setData}
                    destination={destination}
                    category={category}
                    t={t}
                />
            </View>

            <View style={[s.card_container.container, style, { backgroundColor: colors.surface }]}>
                <View style={s.card_container.title_container}>
                    <View style={s.card_container.title}>
                        <View style={s.card.icon_container}>
                            {categoryIcon()}
                        </View>
                        <Txt style={[typography.h3, { color: colors.primary, lineHeight: 22 }]}>{t_category[category]}</Txt>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <FilterCards dateAsc={dateAsc} nameAsc={nameAsc} filterByName={handleFilterByName} filterByDate={handleFilterByDate} />
                        <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
                    </View>
                </View>
                <Collapsible style={s.card_container.collapsible} collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true} >
                    {categoryContent}
                </Collapsible>
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={closeDialog}
                    title={t(MESSAGES.DELETE_CARD_TITLE)}
                    content={<Txt>{t(MESSAGES.DELETE_CARD_CONTENT)}</Txt>}
                    cancel={closeDialog}
                    validate={deleteConfirm}
                />

            </View >
        </>
    )
});

export default CardContainer