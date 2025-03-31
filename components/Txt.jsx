import { Text, useWindowDimensions } from "react-native";
import { useTheme } from "../hook/theme";
import { s } from "../styles/styles.style";

export default function Txt({ children, style }) {
    const { colors } = useTheme()
    const { height } = useWindowDimensions();
    const fontSize = style?.fontSize || s.text.text.fontSize

    return (
        <Text style={[s.text.text, { color: colors.text }, style, { fontSize: fontSize * 0.00117 * height }]}>{children}</Text>
    )
}