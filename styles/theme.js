import THEME from "./theme.json"
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper"

export const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...THEME.light.colors
    },
    // Add custom properties
    elevation: THEME.light.elevation,
    typography: THEME.light.typography,
    opacity: THEME.light.opacity
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...THEME.dark.colors
    },
    // Add custom properties
    elevation: THEME.dark.elevation,
    typography: THEME.dark.typography,
    opacity: THEME.dark.opacity
};

