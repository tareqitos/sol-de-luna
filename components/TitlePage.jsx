import { TouchableOpacity, View } from "react-native";
import { s } from "../styles/styles.style";
import { ArrowLeft } from "lucide-react-native";
import Title from "./Title";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

export default function TitlePage({ title }) {
    const nav = useNavigation();
    const { colors } = useTheme();
    return (
        <View style={s.header.title_container}>
            <TouchableOpacity onPress={() => nav.goBack()}>
                <ArrowLeft color={colors.onBackground} size={20} />
            </TouchableOpacity>
            <Title subtitle={title} />
        </View>
    )
}