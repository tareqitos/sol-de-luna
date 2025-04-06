import { TouchableOpacity, View } from "react-native";
import Container from "../components/Container";
import { s } from "../styles/styles.style";
import { useNavigation } from "@react-navigation/native";
import { Button, useTheme } from "react-native-paper";
import TitlePage from "../components/TitlePage";
import HotelSearchMap from "../components/HotelSearchMap";

export default function AddHotels() {
    const nav = useNavigation();
    const { colors, typography } = useTheme();

    return (
        <Container style={{ paddingHorizontal: 20 }}>
            <TitlePage title={"Add hotel"} />

            <HotelSearchMap />
            <Button
                icon={"plus-box"}
                mode="contained"
                style={{ marginBottom: 20 }}
                labelStyle={[typography.h4, { color: colors.onPrimary }]}
                onPress={"handleSubmit(onSubmit)"}>
                Add
            </Button>
        </Container>
    )
}