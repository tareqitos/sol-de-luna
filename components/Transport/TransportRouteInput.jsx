import { View } from "react-native";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { HelperText, TextInput, useTheme } from "react-native-paper";
import { FORM, MESSAGES } from "../../locales/languagesConst";

export default function TransportRouteInput({ t, control, errors }) {
    const { colors, typography } = useTheme();

    const { field: departureField } = useController({
        control,
        name: "departure",
        rules: {
            required: "Departure is required",
        }
    })

    const { field: arrivalField } = useController({
        control,
        name: "arrival",
        rules: {
            required: "Arrival is required",
        }
    })

    const departureError = errors?.departure ? true : false
    const arrivalError = errors?.arrival ? true : false
    const departureErrorColor = departureError ? colors.error : typography.caption.color;
    const arrivalErrorColor = arrivalError ? colors.error : typography.caption.color;
    const errorMessage = t(MESSAGES.REQUIRED_MESSAGE)


    return (
        <>
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <TextInput
                    label={t(FORM.TRANSPORT_DEPARTURE_CITY)}
                    mode="flat"
                    error={departureError}
                    value={departureField.value}
                    onChangeText={departureField.onChange}
                    style={[
                        s.form.input,
                        departureField.value?.length == 0 ? typography.caption : typography.body,
                        {
                            flex: 1,
                            paddingHorizontal: 0, color: colors.onBackground, backgroundColor: colors.background
                        }
                    ]}
                    placeholder={t(FORM.TRANSPORT_DEPARTURE_CITY_PLACEHOLDER)}
                    placeholderTextColor={typography.caption.color}
                    inputMode="text"
                    autoCorrect={false}
                    outlineColor={departureErrorColor}
                    right={<TextInput.Icon icon="source-commit-start" style={{ alignSelf: "baseline" }} size={18} />}

                />

                <TextInput
                    label={t(FORM.TRANSPORT_ARRIVAL_CITY)}
                    mode="flat"
                    error={arrivalError}
                    value={arrivalField.value}
                    onChangeText={arrivalField.onChange}
                    style={[
                        s.form.input,
                        arrivalField.value?.length == 0 ? typography.caption : typography.body,
                        {
                            flex: 1,
                            paddingHorizontal: 0, color: colors.onBackground, backgroundColor: colors.background
                        }
                    ]}
                    placeholder={t(FORM.TRANSPORT_ARRIVAL_CITY_PLACEHOLDER)}
                    placeholderTextColor={typography.caption.color}
                    inputMode="text"
                    autoCorrect={false}
                    outlineColor={arrivalErrorColor}
                    right={<TextInput.Icon icon="source-commit-end" style={{ alignSelf: "baseline" }} size={18} />}
                />



            </View>
            {arrivalError &&
                <HelperText padding="none" style={{ paddingVertical: 0 }} type="error" visible={arrivalError}>
                    {errorMessage}
                </HelperText>}
        </>
    )
}