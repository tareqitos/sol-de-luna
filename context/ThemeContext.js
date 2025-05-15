import { createContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
    theme: 'system',
    setTheme: () => { },
    toggleTheme: () => { },
})

const THEME_STORAGE_KEY = 'app_theme';

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('system')
    const systemTheme = Appearance.getColorScheme();

    useEffect(() => {
        loadSavedTheme();
    }, [])

    const loadSavedTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                setTheme(savedTheme)
            } else {
                setTheme('system')
            }
        } catch (error) {
            console.log("Failed to load theme: ", error)
        }
    }

    const toggleTheme = async () => {
        const newTheme = prevTheme === 'light' ? 'dark' : prevTheme === 'dark' ? 'system' : 'light';
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
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            if (theme === 'system') {
                console.log("System theme changed to: ", colorScheme)
                setTheme('system');
            }
        });

        return () => {
            subscription.remove();
        };

    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}