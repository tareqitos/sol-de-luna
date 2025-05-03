import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext({
    unit: "C",
    cardsOpen: true
});

export function SettingsProvider({ children }) {
    const [unit, setUnit] = useState("C");
    const [cardsOpen, setCardsOpen] = useState(true)

    const UNIT_STORAGE_KEY = 'app_temp_unit';
    const CARDS_STORAGE_KEY = 'app_cards_open';

    const toggleCardsOpen = () => {
        setCardsOpen(prev => prev === true ? false : true)
    }

    const saveCardsOptionToAsync = async () => {
        try {
            await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cardsOpen) || "true")
            console.log("Cards preferences saved: ", cardsOpen);
        } catch (error) {
            console.log("Failed to save cards preferences: ", error)
        }
    }

    const loadCardsOption = async () => {
        try {
            const savedCardOption = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
            if (savedCardOption) {
                const parsedOption = JSON.parse(savedCardOption)
                setCardsOpen(parsedOption);
            } else {
                setCardsOpen(true);
            }
            console.log("Cards preference loaded: ", cardsOpen)
        } catch (error) {
            console.log("Failed to load cards preference: ", error)
        }
    }


    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
    };

    const saveTempUnit = async () => {
        try {
            await AsyncStorage.setItem(UNIT_STORAGE_KEY, unit || null)
            console.log("Temp unit saved: ", unit)
        } catch (error) {
            console.log("Failed to save temp unit: ", error)
        }
    }

    const loadTempUnit = async () => {
        try {
            const savedUnit = await AsyncStorage.getItem(UNIT_STORAGE_KEY)
            if (savedUnit) {
                setUnit(savedUnit)
            } else {
                setUnit("C")
            }
            console.log("Temp unit loaded: ", unit)
        } catch (error) {
            console.log("Failed to load temp unit: ", error)
        }
    }

    useEffect(() => {
        loadTempUnit()
        loadCardsOption()
    }, [])

    useEffect(() => {
        saveTempUnit()
    }, [unit])

    useEffect(() => {
        saveCardsOptionToAsync()
    }, [cardsOpen])

    return (
        <SettingsContext.Provider value={{ unit, toggleUnit, cardsOpen, toggleCardsOpen }}>
            {children}
        </SettingsContext.Provider>
    );
}