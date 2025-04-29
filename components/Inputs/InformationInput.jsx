import { TextInput } from "react-native-paper";
import { useController } from "react-hook-form";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import { s } from "../../styles/styles.style";

export default function InformationInput({ placeholder, control }) {
    const [height, setHeight] = useState(0); // Default height
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        name: "additionalInformation"
    })

    return (
        <>
            <TextInput
                label={"Additional information"}
                mode="flat"
                value={field.value}
                onChangeText={field.onChange}
                multiline
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                onContentSizeChange={(e) => setHeight(Math.max(height, e.nativeEvent.contentSize.height))}
                style={[
                    s.form.input,
                    field.value.length == 0 ? typography.caption : typography.body,
                    { color: colors.onBackground, backgroundColor: colors.background }
                ]}
                outlineColor={typography.caption.color}
                autoCorrect={false}
                right={<TextInput.Icon icon="information" style={{ alignSelf: "baseline" }} size={18} />}
            />
        </>
    )
}