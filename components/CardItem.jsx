import React, { memo, useEffect, useState } from "react";
import { Animated, TouchableOpacity, Platform } from "react-native";
import { getScaleValue, handlePressIn, handlePressOut, cleanupScaleValue } from "../services/animation-service";
import { Button, Divider, Modal, Portal } from "react-native-paper";
import ModalCard from "./UI/Modal";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { DIALOGS } from "../locales/languagesConst";

const CardItem = memo(({ item, destination, deleteItem, handleDeleteItem, CardComponent, t }) => {
    const nav = useNavigation();
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const deleteCard = () => {
        hideModal()
        Platform.OS === "android" ? handleDeleteItem(item) : deleteItem(destination.id, item)
    }

    const editPages = {
        flights: "AddFlight",
        hotels: "AddHotel",
        transport: "AddTransport"
    }

    const scaleValue = getScaleValue(item.id);

    // cleans up the values when component unmounts
    useEffect(() => {
        return () => {
            cleanupScaleValue(item.id);
        };
    }, [item.id]);

    return (
        <Animated.View
            style={{ transform: [{ scale: scaleValue }] }}
        >
            <TouchableOpacity
                onPressIn={() => handlePressIn(1.05, item.id)}
                onPressOut={() => handlePressOut(item.id)}
                onLongPress={showModal}
                activeOpacity={1}
            >
                <CardComponent
                    item={item}
                    destination={destination}
                />
            </TouchableOpacity>

            <ModalCard
                visible={visible}
                onDismiss={hideModal}
            >
                <Button onPressIn={hideModal} onPress={() => nav.navigate(editPages[item.type], { item, destinationId: destination.id, isEdit: true })}>{t(DIALOGS.EDIT)}</Button>

                <Button onPress={deleteCard}>{t(DIALOGS.DELETE)}</Button>
            </ModalCard>

        </Animated.View>
    )
});

export default CardItem;