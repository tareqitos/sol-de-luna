import { useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";

export default function CardSubtitle({ text, style }) {
    const { colors, typography } = useTheme()
    return <Txt style={[typography.h5, { fontSize: 18, color: colors.onBackground }, style]}>{text}</Txt>
}