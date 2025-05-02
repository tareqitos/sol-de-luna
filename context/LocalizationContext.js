import { createContext, useEffect, useState } from "react"
import i18n, { getCurrentLocale, setLocale } from "../locales"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { loadFromStorage, saveToStorage } from "../services/storage"

export const LocalizationContext = createContext({
    languages: [],
    setLanguage: () => { }
})

const LANG_STORAGE_KEY = "app_language"

export function LocalizationProvider({ children }) {

    const [selected, setSelected] = useState("")
    const [languages] = useState([
        { tag: 'en', name: 'English' },
        { tag: 'fr', name: "Français" }
    ])

    useEffect(() => {
        loadSelectedLanguage();
    }, []);

    const setLanguage = (lang) => {
        setLocale(lang)
        setSelected(languages.find((l) => l.tag === lang));
        try {
            saveToStorage(LANG_STORAGE_KEY, lang)
            console.log("Language saved: ", lang)

        } catch (error) {
            console.log("Error saving language: ", error)
        }
    }

    const loadSelectedLanguage = async () => {
        try {
            const savedLanguage = await loadFromStorage(LANG_STORAGE_KEY)
            if (savedLanguage) {
                setSelected(languages.find((l) => l.tag === savedLanguage));
                setLanguage(savedLanguage)
                console.log("Language loaded: ", savedLanguage)
            } else {
                const currentLocale = getCurrentLocale();
                setSelected(languages.find((l) => l.tag === currentLocale));
                console.log("Detected locale:", currentLocale);
            }

        } catch (error) {
            console.log("Failed to load language: ", error)
        }
    }

    return (
        <LocalizationContext.Provider value={{ languages, selected, setLanguage }}>
            {children}
        </LocalizationContext.Provider>
    )
}