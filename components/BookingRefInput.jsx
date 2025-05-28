import { HelperText, TextInput } from "react-native-paper";
import { s } from "../styles/styles.style";
import { useController } from "react-hook-form";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { MESSAGES } from "../locales/languagesConst";
import { View } from "react-native";


export const BookingRefInput = ({ label, placeholder, control, errors }) => {
    const { t } = useTranslation()
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "bookingReference",
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
                textColor={colors.onBackground}
                style={[
                    s.form.input,
                    field.value.length == 0 ? typography.caption : typography.body,
                    { color: colors.onBackground, backgroundColor: colors.background }
                ]}
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                autoCorrect={false}
                right={
                    <TextInput.Icon
                        icon="checkbook"
                        size={18}
                        style={{ alignSelf: "baseline" }}
                    />}
            />
            {error &&
                <HelperText padding="none" style={{ paddingVertical: 0 }} type="error" visible={error}>
                    {t(MESSAGES.REQUIRED_MESSAGE)}
                </HelperText>}
        </View>
    )
}