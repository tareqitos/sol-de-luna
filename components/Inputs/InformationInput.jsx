import { TextInput } from "react-native";
import Txt from "../Txt";
import { s } from "../../styles/styles.style";
import { useController } from "react-hook-form";
import { useState } from "react";
import { useTheme } from "react-native-paper";

export default function InformationInput({ placeholder, control }) {
    const [height, setHeight] = useState(200); // Default height
    const { colors, typography } = useTheme();
    const { field } = useController({
        control,
        name: "additionalInformation"
    })

    return (
        <>
            <Txt style={typography.h4}>Additional information</Txt>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                multiline
                textAlignVertical="top"
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                onContentSizeChange={(e) => setHeight(Math.max(200, e.nativeEvent.contentSize.height))}
                style={[s.form.input, s.form.input_info, typography.body, { color: colors.onBackground, borderColor: typography.caption.color, height: height }]}
            />
        </>
    )
}