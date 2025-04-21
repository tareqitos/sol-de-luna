import { useTheme } from "react-native-paper";
import Txt from "../Txt";

export default function CardSubtitle({ text, style }) {
    const { colors, typography } = useTheme()
    return <Txt style={[typography.h4, { color: colors.onBackground }, style]}>{text}</Txt>
}