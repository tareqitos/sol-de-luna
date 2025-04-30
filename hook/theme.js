import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export function themeHook() {
    const { theme, setTheme, toggleTheme } = useContext(ThemeContext)

    return { theme, setTheme, toggleTheme }
}