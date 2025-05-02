import AsyncStorage from "@react-native-async-storage/async-storage"

export const saveToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to save ${key}: `, error)
    }
}

export const loadFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Failed to load ${key}: `, error)
        return null
    }
}