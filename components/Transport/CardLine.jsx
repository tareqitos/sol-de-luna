import { View } from "react-native";
import Txt from "../Utils/Txt";
import { useTheme } from "react-native-paper";

export default function CardLine({ line }) {
    const { colors, typography } = useTheme();
    return (
        <View>
            <Txt style={[{ color: colors.onPrimary, fontSize: 24, fontFamily: "Inter-Regular" }]}>{line}</Txt>
        </View>
    )
}