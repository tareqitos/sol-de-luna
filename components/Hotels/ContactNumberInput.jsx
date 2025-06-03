import { TextInput } from "react-native-paper";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { useTheme } from "react-native-paper";
import { View } from "react-native";

export const ContactNumberInput = ({ label, placeholder, control }) => {
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        defaultValue: '',
        name: "contactNumber",
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
                inputMode="tel"
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                autoCorrect={false}
                maxLength={40}
                right={
                    <TextInput.Icon
                        icon="phone"
                        size={18}
                        style={{ alignSelf: "baseline" }}
                    />}
            />
        </View>
    )
}