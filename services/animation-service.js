import { Animated } from "react-native";

export let scaleValues = {}

export const cleanupScaleValue = (id) => {
    if (scaleValues[id]) {
        delete scaleValues[id];
    }
}

export const getScaleValue = (id) => {
    if (!scaleValues[id]) {
        scaleValues[id] = new Animated.Value(1);
    }
    return scaleValues[id];
};

export const handlePressIn = (scale, id) => {
    Animated.spring(getScaleValue(id), {
        toValue: scale,
        duration: 20,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
    }).start();
};

export const handlePressOut = (id) => {
    Animated.spring(getScaleValue(id), {
        toValue: 1,
        duration: 20,
        bounciness: 10,
        speed: 10,
        useNativeDriver: true,
    }).start();
};