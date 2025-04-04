import { TextInput } from "react-native";
import { s } from "../../styles/styles.style";
import Txt from "../Txt";
import { useController } from "react-hook-form";
import { useTheme } from "react-native-paper";

export default function TitleInput({ name, placeholder, maxLength, control, errors }) {
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "name",
        rules: {
            required: "Title is required"
        }
    })

    const errorBorder = errors?.name ? colors.error : typography.caption.color;
    return (
        <>
            <Txt style={typography.h4}>{name}</Txt>
            <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                style={[s.form.input, field.value.length == 0 ? typography.caption : typography.body, { color: colors.onBackground, borderColor: errorBorder }]}
                maxLength={maxLength}
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
            />
            {errors?.name && <Txt style={{ color: colors.error }}>{name} is required</Txt>}
        </>
    )
}