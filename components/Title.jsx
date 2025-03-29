import { Text, View } from "react-native";
import Txt from "./Txt";
import { s } from "../styles/styles.style";

export default function Title({ title, subtitle }) {
    return (
        <View style={s.header.container}>
            {title && <Txt style={s.header.title}>{title}</Txt>}
            {subtitle && <Txt style={s.header.subtitle}>{subtitle}</Txt>}
        </View>
    )
}