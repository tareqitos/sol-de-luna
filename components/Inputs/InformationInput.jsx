import { TextInput } from "react-native";
import Txt from "../Txt";
import { s } from "../../styles/styles.style";
import { useTheme } from "../../hook/theme";
import { useController } from "react-hook-form";

export default function InformationInput({ placeholder, control }) {
    const { colors } = useTheme();
    const { field } = useController({
        control,
        name: "additionnalInformation"
    })

    return (
        <>
            <Txt>Additionnal information</Txt>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                multiline
                maxLength={200}
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
                style={[s.form.input, { borderColor: colors.grey, height: 150 }]}
            />
        </>
    )
}