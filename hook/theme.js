import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { themes } from "../styles/theme.style"

export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const colors = themes[theme];

    return { theme, toggleTheme, colors }
}