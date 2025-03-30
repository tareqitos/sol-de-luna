import { TextInput } from "react-native";
import { useTheme } from "../../hook/theme";
import { s } from "../../styles/styles.style";
import Txt from "../Txt";

export default function TitleInput({ name, value, placeholder, maxLength }) {
    const { colors } = useTheme();
    return (
        <>
            <Txt>{name}</Txt>
            <TextInput
                style={[s.form.input, { borderColor: colors.grey }]}
                maxLength={maxLength}
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
            />
        </>
    )
}