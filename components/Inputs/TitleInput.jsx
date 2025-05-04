import { HelperText, TextInput } from "react-native-paper";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { MESSAGES } from "../../locales/languagesConst";

export default function TitleInput({ name, placeholder, maxLength, control, errors }) {
    const { t } = useTranslation()
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "name",
        rules: {
            required: "Required"
        }
    })
    const error = errors?.name ? true : false
    return (
        <>
            <TextInput
                label={name}
                mode="flat"
                focusable
                error={error}
                value={field.value}
                onChangeText={field.onChange}
                textColor={colors.onBackground}
                style={[
                    s.form.input,
                    field.value.length == 0 ? typography.caption : typography.body,
                    { color: colors.onBackground, backgroundColor: colors.background }
                ]}
                maxLength={maxLength || 50}
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                autoCorrect={false}
            />
            {error &&
                <HelperText padding="none" style={{ paddingVertical: 0 }} type="error" visible={error}>
                    {t(MESSAGES.REQUIRED_MESSAGE)}
                </HelperText>}
        </>
    )
}