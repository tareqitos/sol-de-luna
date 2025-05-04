import React, { memo, useEffect } from "react";
import { Animated, TouchableOpacity, Platform } from "react-native";
import { getScaleValue, handlePressIn, handlePressOut, cleanupScaleValue } from "../services/animation-service";

const CardItem = memo(({ item, destination, deleteItem, handleDeleteItem, CardComponent }) => {
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
                onLongPress={() => Platform.OS === "android" ? handleDeleteItem(item) : deleteItem(destination.id, item)}
                activeOpacity={1}
            >
                <CardComponent
                    item={item}
                    destination={destination}
                />
            </TouchableOpacity>
        </Animated.View>
    )
});

export default CardItem;