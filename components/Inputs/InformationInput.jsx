import { TextInput } from "react-native";
import Txt from "../Txt";
import { s } from "../../styles/styles.style";
import { useTheme } from "../../hook/theme";
import { useController } from "react-hook-form";
import { useState } from "react";

export default function InformationInput({ placeholder, control }) {
    const [height, setHeight] = useState(200); // Default height
    const { colors } = useTheme();
    const { field } = useController({
        control,
        name: "additionalInformation"
    })

    return (
        <>
            <Txt>Additional information</Txt>
            <TextInput
                value={field.value}
                onChangeText={field.onChange}
                multiline
                textAlignVertical="top"
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
                onContentSizeChange={(e) => setHeight(Math.max(200, e.nativeEvent.contentSize.height))}
                style={[s.form.input, { borderColor: colors.grey, height: height }]}
            />
        </>
    )
}