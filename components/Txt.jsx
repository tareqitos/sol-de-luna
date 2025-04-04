import { Text, useWindowDimensions } from "react-native";
import { s } from "../styles/styles.style";
import { useTheme } from "react-native-paper";

export default function Txt({ children, style }) {
    const { colors } = useTheme();
    const { height } = useWindowDimensions();
    const fontSize = style?.fontSize || s.text.text.fontSize

    return (
        <Text style={[s.text.text, { color: colors.onBackground, fontSize: fontSize * 0.0011 * height }, style]}>{children}</Text>
    )
}