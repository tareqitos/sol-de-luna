import { StyleSheet } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

export const RouteField = ({ label, placeholder, field, fieldText, showList, icon, error }) => {
    const { colors, typography } = useTheme();

    return (
        <TextInput
            label={label}
            placeholder={placeholder}
            mode="flat"
            focusable
            error={error}
            value={field.city && field.iata ? `${field.city} (${field.iata})` : field.city}
            onChangeText={(text) => showList(text, fieldText)}
            style={[
                styles.input,
                field.city && field.city.length == 0 ? typography.caption : typography.body,
                { color: colors.onBackground, backgroundColor: 'transparent' }
            ]}
            placeholderTextColor={typography.caption.color}
            inputMode="text"
            autoCorrect={false}
            outlineColor={colors.outline}
            right={
                <TextInput.Icon
                    icon={icon}
                    size={18}
                    style={{ alignSelf: "baseline" }}
                />}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingHorizontal: 0
    },
});