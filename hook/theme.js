import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { themes } from "../styles/theme.style"

export function themeHook() {
    const { theme, setTheme, toggleTheme } = useContext(ThemeContext)

    return { theme, setTheme, toggleTheme }
}