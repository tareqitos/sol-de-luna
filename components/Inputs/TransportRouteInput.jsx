import { MoveRight } from "lucide-react-native";
import Txt from "../Txt";
import { View } from "react-native";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { TextInput, useTheme } from "react-native-paper";

export default function TransportRouteInput({ control, errors }) {
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
    const errorMessage = "Required"


    return (
        <>
            <View>
                <TextInput
                    label={"From"}
                    mode="flat"
                    value={departureField.value}
                    onBlur={departureField.onBlur}
                    onChangeText={departureField.onChange}
                    style={[
                        s.form.input,
                        departureField.value?.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}
                    placeholder="Enter departure location"
                    placeholderTextColor={typography.caption.color}
                    inputMode="text"
                    autoCorrect={false}
                    outlineColor={departureErrorColor}
                    right={<TextInput.Icon icon="source-commit-start" style={{ alignSelf: "baseline" }} size={18} />}

                />

                <TextInput
                    label={"To"}
                    mode="flat"
                    value={arrivalField.value}
                    onBlur={arrivalField.onBlur}
                    onChangeText={arrivalField.onChange}
                    style={[
                        s.form.input,
                        arrivalField.value?.length == 0 ? typography.caption : typography.body,
                        { color: colors.onBackground, backgroundColor: colors.background }
                    ]}
                    placeholder="Enter arrival location"
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