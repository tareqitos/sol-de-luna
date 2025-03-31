import { TextInput } from "react-native";
import { useTheme } from "../../hook/theme";
import { s } from "../../styles/styles.style";
import Txt from "../Txt";
import { useController } from "react-hook-form";

export default function TitleInput({ name, value, placeholder, maxLength, control, errors }) {
    const { colors } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "title",
        rules: {
            required: "Title is required"
        }
    })

    const errorBorder = errors?.title ? colors.error : colors.grey;
    return (
        <>
            <Txt>{name}</Txt>
            <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                style={[s.form.input, { borderColor: errorBorder }]}
                maxLength={maxLength}
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
            />
            {errors?.title && <Txt style={{ color: colors.error, marginTop: 2 }}>{name} is required</Txt>}
        </>
    )
}