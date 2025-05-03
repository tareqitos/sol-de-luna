import Txt from "../Utils/Txt";
import { View } from "react-native";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { TextInput, useTheme } from "react-native-paper";
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

    const departureErrorColor = errors?.departure ? colors.error : typography.caption.color;
    const arrivalErrorColor = errors?.arrival ? colors.error : typography.caption.color;
    const errorMessage = t(MESSAGES.REQUIRED_MESSAGE)


    return (
        <>
            <View>
                <TextInput
                    label={t(FORM.TRANSPORT_DEPARTURE_CITY)}
                    mode="flat"
                    value={departureField.value}
                    onBlur={departureField.onBlur}
                    onChangeText={departureField.onChange}
                    style={[
                        s.form.input,
                        departureField.value?.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground, backgroundColor: colors.background }
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
                    value={arrivalField.value}
                    onBlur={arrivalField.onBlur}
                    onChangeText={arrivalField.onChange}
                    style={[
                        s.form.input,
                        arrivalField.value?.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}
                    placeholder={t(FORM.TRANSPORT_ARRIVAL_CITY_PLACEHOLDER)}
                    placeholderTextColor={typography.caption.color}
                    inputMode="text"
                    autoCorrect={false}
                    outlineColor={arrivalErrorColor}
                    right={<TextInput.Icon icon="source-commit-end" style={{ alignSelf: "baseline" }} size={18} />}

                />

            </View>
            {errors?.departure || errors?.arrival ?
                <Txt style={{ color: colors.error }}>{errorMessage}</Txt> : null
            }
        </>
    )
}