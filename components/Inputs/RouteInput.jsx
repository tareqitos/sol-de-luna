import { MoveRight } from "lucide-react-native";
import Txt from "../Txt";
import { TextInput, View } from "react-native";
import { useTheme } from "../../hook/theme";
import { s } from "../../styles/styles.style";

export default function RouteInput({ iataRef }) {
    const { colors } = useTheme();

    const onNextIataInput = (text) => {
        if (text.length >= 3) {
            iataRef.current.focus();
        }
    }
    return (
        <>
            <Txt>Route</Txt>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <TextInput
                    style={[s.form.input, s.form.route_input, { borderColor: colors.grey }]}
                    maxLength={3}
                    placeholder="e.g BRU"
                    placeholderTextColor={colors.grey}
                    autoCapitalize="characters"
                    inputMode="text"
                    autoCorrect={false}
                    onChangeText={onNextIataInput}
                />
                <MoveRight
                    color={colors.card.icon}
                    size={14} />
                <TextInput
                    ref={iataRef}
                    style={[s.form.input, s.form.route_input, { borderColor: colors.grey }]}
                    maxLength={3}
                    placeholder="e.g NRT"
                    placeholderTextColor={colors.grey}
                    autoCapitalize="characters"
                    inputMode="text"
                    autoCorrect={false}
                />
            </View>
        </>
    )
}