import { View } from "react-native";
import Txt from "./Txt";
import { s } from "../../styles/styles.style";
import { IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Title({ title, subtitle }) {
    const nav = useNavigation()
    const { colors, typography } = useTheme();
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[s.header.container, { flexDirection: "row", alignItems: "baseline" }]}>
                {title && <Txt style={[s.header.title, title.length < 15 ? typography.h0 : typography.h1, { lineHeight: 45 }]}>{title}</Txt>}
                {subtitle && <Txt style={[s.header.subtitle, typography.h2, { fontFamily: "Raleway-Light" }]}>{subtitle}</Txt>}
            </View>
            <IconButton iconColor={colors.primary} icon="cog" size={24} onPress={() => nav.navigate('Settings')} />
        </View>
    )
}