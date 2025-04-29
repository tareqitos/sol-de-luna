import { PaperProvider, TextInput } from "react-native-paper";
import { s } from "../../styles/styles.style";
import Txt from "../Utils/Txt";
import { useController } from "react-hook-form";
import { useTheme } from "react-native-paper";

export default function AddressInput({ name, placeholder, maxLength, control, errors }) {
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "address",
        rules: {
            required: "Address is required"
        }
    })

    const errorBorder = errors?.address ? colors.error : typography.caption.color;
    return (
        <>
            <TextInput
                label={name}
                mode="flat"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                textColor={colors.onBackground}
                outlineColor={errorBorder}
                style={[
                    s.form.input,
                    field.value.length == 0 ? typography.caption : typography.body,
                    { color: colors.onBackground, backgroundColor: colors.background }
                ]}
                maxLength={maxLength || 200}
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                autoCorrect={false}
            />
            {errors?.address && <Txt style={{ color: colors.error }}>{errors.address.message}</Txt>}
        </>
    )
}