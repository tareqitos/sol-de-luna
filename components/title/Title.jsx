import { Text, View } from "react-native";
import { s } from "./Title.style";
import Txt from "../txt/Txt";

export default function Title() {
    return (
        <View style={s.container}>
            <Txt style={s.title}>Trips</Txt>
            <Txt style={s.subtitle}>Overview</Txt>
        </View>
    )
}