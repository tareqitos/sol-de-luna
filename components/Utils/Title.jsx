import { Text, View } from "react-native";
import Txt from "./Txt";
import { s } from "../../styles/styles.style";
import { IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Title({ title, subtitle }) {
    const nav = useNavigation()
    const { colors, typography } = useTheme();
    return (
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <View style={s.header.container}>
                {title && <Txt style={[s.header.title, typography.h0]}>{title}</Txt>}
                {subtitle && <Txt style={[s.header.subtitle, typography.h2, { fontFamily: "Raleway-Light" }]}>{subtitle}</Txt>}
            </View>
            <IconButton iconColor={colors.primary} icon="cog" size={24} onPress={() => nav.navigate('Settings')} />
        </View>
    )
}