import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext({
    unit: "C",
});

export function SettingsProvider({ children }) {
    const [unit, setUnit] = useState("C");

    const THEME_STORAGE_KEY = 'app_temp_unit';


    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
    };

    const saveTempUnit = async () => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, unit || null)
            console.log("Temp unit saved: ", unit)
        } catch (error) {
            console.log("Failed to save temp unit: ", error)
        }
    }

    const loadTempUnit = async () => {
        try {
            const savedUnit = await AsyncStorage.getItem(THEME_STORAGE_KEY)
            if (savedUnit) {
                setUnit(savedUnit)
            } else {
                setUnit("")
            }
            console.log("Temp unit loaded: ", unit)
        } catch (error) {
            console.log("Failed to load temp unit: ", error)
        }
    }

    useEffect(() => {
        loadTempUnit()
    }, [])

    useEffect(() => {
        saveTempUnit()
    }, [unit])

    return (
        <SettingsContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </SettingsContext.Provider>
    );
}