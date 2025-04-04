import { Text, View } from "react-native";
import Txt from "./Txt";
import { s } from "../styles/styles.style";
import { useTheme } from "react-native-paper";

export default function Title({ title, subtitle }) {
    const { colors, typography } = useTheme();
    return (
        <View style={s.header.container}>
            {title && <Txt style={[s.header.title, typography.h0]}>{title}</Txt>}
            {subtitle && <Txt style={[s.header.subtitle, typography.h2, { fontFamily: "Raleway-Light" }]}>{subtitle}</Txt>}
        </View>
    )
}