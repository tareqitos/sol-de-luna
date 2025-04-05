import { useTheme } from "react-native-paper";
import { s } from "../../styles/card.style";
import Txt from "../Txt";

export default function CardTitle({ title }) {
    const { colors, typography } = useTheme()
    return <Txt style={[s.card.title, typography.h2]}>{title}</Txt>
}