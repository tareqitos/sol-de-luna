import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
})

const THEME_STORAGE_KEY = 'app_theme';

export function ThemeProvider({ children }) {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        loadSavedTheme();
    }, [])

    const loadSavedTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                setTheme(savedTheme)
            } else {
                setTheme(systemColorScheme || 'light')
            }
        } catch (error) {
            console.log("Failed to load theme: ", error)
        }
    }

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    const saveTheme = async () => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme || systemColorScheme)
            console.log("theme saved: ", theme)
        } catch (error) {
            console.log("Failed to save theme: ", error)
        }
    }

    useEffect(() => {
        saveTheme();

    }, [theme, systemColorScheme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}