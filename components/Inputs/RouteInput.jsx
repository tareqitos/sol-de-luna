import { MoveRight } from "lucide-react-native";
import Txt from "../Txt";
import { View } from "react-native";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { PaperProvider, TextInput, useTheme } from "react-native-paper";

export default function RouteInput({ iataRef, control, errors }) {
    const { colors, typography } = useTheme();

    const { field: departureField } = useController({
        control,
        name: "departureAirport",
        rules: {
            required: "Departure airport is required",
            minLength: { value: 3, message: "Airport code must be 3 characters" }
        }
    })

    const { field: arrivalField } = useController({
        control,
        name: "arrivalAirport",
        rules: {
            required: "Arrival airport is required",
            minLength: { value: 3, message: "Airport code must be 3 characters" }
        }
    })

    const onNextIataInput = (text) => {
        departureField.onChange(text)
        if (text.length >= 3) {
            iataRef.current.focus();
        }
    }

    const departureErrorColor = errors?.departureAirport ? colors.error : typography.caption.color;
    const arrivalErrorColor = errors?.arrivalAirport ? colors.error : typography.caption.color;
    const errorMessage = "Min 3 characters"


    return (
        <>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <TextInput
                    label={"Route"}
                    mode="outlined"
                    value={departureField.value?.toUpperCase()}
                    onBlur={departureField.onBlur}
                    style={[
                        s.form.input,
                        departureField.value.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground }
                    ]}
                    maxLength={3}
                    placeholder="e.g BRU"
                    placeholderTextColor={typography.caption.color}
                    autoCapitalize="characters"
                    inputMode="text"
                    autoCorrect={false}
                    onChangeText={onNextIataInput}

                    theme={PaperProvider}
                    outlineColor={departureErrorColor}
                />

                <MoveRight
                    color={colors.primary}
                    size={14} />

                <TextInput
                    ref={iataRef}
                    label={"Route"}
                    mode="outlined"
                    value={arrivalField.value.toUpperCase()}
                    onBlur={arrivalField.onBlur}
                    onChangeText={arrivalField.onChange}
                    style={[
                        s.form.input,
                        arrivalField.value.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground }
                    ]}
                    maxLength={3}
                    placeholder="e.g NRT"
                    placeholderTextColor={typography.caption.color}
                    autoCapitalize="characters"
                    inputMode="text"
                    autoCorrect={false}

                    theme={PaperProvider}
                    outlineColor={arrivalErrorColor}
                />

            </View>
            {errors?.departureAirport || errors?.arrivalAirport ?
                <Txt style={{ color: colors.error }}>{errorMessage}</Txt> : null
            }
        </>
    )
}