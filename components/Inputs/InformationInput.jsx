import { TextInput } from "react-native";
import Txt from "../Txt";
import { s } from "../../styles/styles.style";
import { useTheme } from "../../hook/theme";

export default function InformationInput({ placeholder }) {
    const { colors } = useTheme();

    return (
        <>
            <Txt>Additionnal information</Txt>
            <TextInput
                multiline
                maxLength={200}
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
                style={[s.form.input, { borderColor: colors.grey, height: 150 }]}
            />
        </>
    )
}