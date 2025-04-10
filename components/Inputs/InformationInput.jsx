import { TextInput } from "react-native-paper";
import { useController } from "react-hook-form";
import { useState } from "react";
import { useTheme } from "react-native-paper";
import { s } from "../../styles/styles.style";

export default function InformationInput({ placeholder, control }) {
    const [height, setHeight] = useState(100); // Default height
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        name: "additionalInformation"
    })

    return (
        <>
            <TextInput
                label={"Additional information"}
                mode="outlined"
                value={field.value}
                onChangeText={field.onChange}
                multiline
                textAlignVertical="top"
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                onContentSizeChange={(e) => setHeight(Math.max(100, e.nativeEvent.contentSize.height))}
                style={[s.form.input,
                field.value.length == 0 ? typography.caption : typography.body,
                { color: colors.onBackground, height: height }
                ]}
                outlineColor={typography.caption.color}
                autoCorrect={false}
            />
        </>
    )
}