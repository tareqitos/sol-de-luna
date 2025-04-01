import { TextInput, TouchableOpacity } from "react-native";
import Txt from "../Txt";
import { s } from "../../styles/card.style";
import { UploadIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useData } from "../../hook/data";
import { useTheme } from "../../hook/theme";

export default function AdditionalInformation({ item, onPress, placeholder }) {

    const [height, setHeight] = useState(100); // Default height
    const { updateData } = useData();
    const { colors } = useTheme();

    const handleTextUpdate = (text) => {
        const updatedItem = { ...item, additionalInformation: text };
        updateData(updatedItem)
    }

    return (
        <>
            <Txt style={s.card.add_title}>Additional information</Txt>
            <TextInput
                editable
                multiline
                textAlignVertical="top"
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
                onContentSizeChange={(e) => setHeight(Math.max(100, e.nativeEvent.contentSize.height))}
                onChange={(e) => handleTextUpdate(e.nativeEvent.text)}
                style={[s.card.add_infos, { backgroundColor: colors.card.lightPurple, height: height }
                ]}>

                {item.additionalInformation}
            </TextInput>
            <TouchableOpacity style={s.card.upload} onPress={onPress}>
                <UploadIcon
                    color="#647457"
                    size={14} />
                <Txt>Add a file</Txt>
            </TouchableOpacity>
        </>
    )
}