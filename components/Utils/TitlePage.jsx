import { View } from "react-native";
import { s } from "../../styles/styles.style";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import Txt from "./Txt";

export default function TitlePage({ title }) {
    const nav = useNavigation();
    const { colors, typography } = useTheme();
    return (
        <View style={s.header.title_container}>
            <IconButton icon="arrow-left" iconColor={colors.onBackground} size={20} hitSlop={{ right: 100 }} onPress={() => nav.goBack()} />

            <Txt style={[typography.h2, { fontFamily: "Raleway-Light" }]}>{title}</Txt>
        </View>
    )
}