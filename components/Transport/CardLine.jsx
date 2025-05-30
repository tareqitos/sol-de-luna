import { View } from "react-native";
import Txt from "../Utils/Txt";
import { useTheme } from "react-native-paper";

export default function CardLine({ line }) {
    const { colors } = useTheme();
    return (
        <View>
            <Txt style={[{ color: colors.primary, fontSize: 18, fontFamily: "Inter-Regular" }]}>{line}</Txt>
        </View>
    )
}