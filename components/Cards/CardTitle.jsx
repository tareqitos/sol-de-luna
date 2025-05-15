import { useTheme } from "react-native-paper";
import { s } from "../../styles/card.style";
import Txt from "../Utils/Txt";

export default function CardTitle({ title, style }) {
    const { typography } = useTheme()
    return <Txt style={[s.card.title, typography.h3, style]}>{title}</Txt>
}