import { Text } from "react-native";
import { useTheme } from "../hook/theme";
import { s } from "../styles/styles.style";

export default function Txt({ children, style }) {
    const { colors } = useTheme()

    return (
        <Text style={[s.text.text, { color: colors.text }, style]}>{children}</Text>
    )
}