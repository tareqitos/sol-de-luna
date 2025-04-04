import { useColorScheme } from "react-native"
import THEME from "./theme.json"

const lightTheme = {
    ...THEME.light,
    colors: THEME.light.colors,
    elevation: THEME.light.elevation,
    typography: THEME.light.typography,
    opacity: THEME.light.opacity
}

const darkTheme = {
    ...THEME.dark,
    colors: THEME.dark.colors,
    elevation: THEME.dark.elevation,
    typography: THEME.dark.typography,
    opacity: THEME.dark.opacity
}

export { lightTheme, darkTheme }