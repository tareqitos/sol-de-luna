import { View } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";
import { s } from "../../styles/styles.style";
import { use } from "i18next";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MESSAGES } from "../../locales/languagesConst";

export default function TransportNumberInput({ label, placeholder, control, errors }) {
    const { colors, typography } = useTheme();
    const { t } = useTranslation();

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
        <View>
            <TextInput
                label={label}
                mode="flat"
                error={error}
                value={field.value}
                onChangeText={field.onChange}
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                style={[
                    s.form.input,
                    field.value.length == 0 ? typography.caption : typography.body,
                    { color: colors.onBackground, backgroundColor: colors.background }
                ]}
                right={
                    <TextInput.Icon icon="transit-connection-horizontal" style={{ alignSelf: "baseline" }} size={18} />
                }
            />
            {error &&
                <HelperText padding="none" style={{ paddingVertical: 0 }} type="error" visible={error}>
                    {t(MESSAGES.REQUIRED_MESSAGE)}
                </HelperText>}
        </View>
    )
}