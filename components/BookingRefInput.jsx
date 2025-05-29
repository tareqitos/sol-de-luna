import { HelperText, TextInput } from "react-native-paper";
import { s } from "../styles/styles.style";
import { useController } from "react-hook-form";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { MESSAGES } from "../locales/languagesConst";
import { View } from "react-native";


export const BookingRefInput = ({ label, placeholder, control }) => {
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "bookingReference",
    })

    return (
        <View>
            <TextInput
                label={label}
                mode="flat"
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
        </View>
    )
}