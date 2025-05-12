import React, { memo, useEffect, useState } from "react";
import { Animated, TouchableOpacity, Platform, View, StyleSheet } from "react-native";
import { getScaleValue, handlePressIn, handlePressOut, cleanupScaleValue } from "../services/animation-service";
import { Button, Divider, Icon, Modal, Portal } from "react-native-paper";
import ModalCard from "./UI/Modal";
import { useNavigation } from "@react-navigation/native";
import { DIALOGS } from "../locales/languagesConst";
import Txt from "./Utils/Txt";
import { useData } from "../hook/data";

const CardItem = memo(({ item, destination, deleteItem, handleDeleteItem, CardComponent, t }) => {
    const nav = useNavigation();
    const { updateItem } = useData();
    const completed = item.completed
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

    const markCardAsDone = () => {
        if (completed) {
            updateItem(destination.id, { ...item, completed: false })
        } else {
            updateItem(destination.id, { ...item, completed: true })
        }
        hideModal();
    }

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
                {
                    completed && <View style={[styles.completedContainer, item.type === "transport" ? { top: 80 } : {}]}>
                        <Icon source="passport-biometric" size={62} color="#E05F42" />
                    </View>
                }
            </TouchableOpacity>

            <ModalCard
                visible={visible}
                onDismiss={hideModal}
            >
                <Button onPress={markCardAsDone}>{completed ? t(DIALOGS.MARK_AS_NOT_DONE) : t(DIALOGS.MARK_AS_DONE)}</Button>
                {!completed && <Button onPressIn={hideModal} onPress={() => nav.navigate(editPages[item.type], { item, destinationId: destination.id, isEdit: true })}>{t(DIALOGS.EDIT)}</Button>}
                <Button onPress={deleteCard}>{t(DIALOGS.DELETE)}</Button>
            </ModalCard>
        </Animated.View>
    )
});

export default CardItem;

const styles = StyleSheet.create({
    completedContainer: {
        position: "absolute",
        right: 30,
        top: 20,
        alignItems: "center",
        transform: [{ rotate: "-20deg" }]

    }
})