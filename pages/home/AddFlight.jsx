import { TouchableOpacity, View } from "react-native";
import Txt from "../../components/Txt";
import Title from "../../components/Title";
import { s } from "../../styles/styles.style";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "../../hook/theme";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";

export default function AddFlight() {
    const { colors } = useTheme()
    const nav = useNavigation();

    return (
        <Container>
            <View style={s.header.container_addItem}>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <ArrowLeft color={colors.text} size={20} />
                </TouchableOpacity>
                <Title subtitle="Add flight" />
            </View>
        </Container>
    )
}