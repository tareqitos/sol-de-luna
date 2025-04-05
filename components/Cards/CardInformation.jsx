import { Keyboard, Pressable, TextInput } from "react-native";
import Txt from "../Txt";
import { s } from "../../styles/card.style";
import { useState } from "react";
import { useData } from "../../hook/data";
import { useTheme } from "react-native-paper";

export default function CardInformation({ item, placeholder }) {

    const [height, setHeight] = useState(100); // Default height
    const [infoText, setInfoText] = useState();
    const [prevText, setPrevText] = useState()
    const { updateData } = useData();
    const { colors, elevation, typography } = useTheme();

    const handleTextUpdate = (text) => {
        const updatedItem = { ...item, additionalInformation: text };
        updateData(updatedItem)
    }

    return (
        <>
            <Txt style={[s.card.add_title, typography.h4, { color: colors.onBackground }]}>Additional information</Txt>

            <TextInput
                editable
                multiline
                textAlignVertical="top"
                placeholder={placeholder}
                placeholderTextColor={typography.caption.color}
                onContentSizeChange={(e) => setHeight(Math.max(80, e.nativeEvent.contentSize.height))}
                onChange={(e) => setInfoText(e.nativeEvent.text)}
                onBlur={(e) => {
                    if (infoText !== prevText) {
                        setPrevText(infoText)
                        handleTextUpdate(infoText)
                    }
                }}
                style={[s.card.add_infos, elevation.level1, typography.body, { color: colors.onSurface, backgroundColor: colors.surface, height: height }]}>

                {item.additionalInformation}

            </TextInput>
        </>
    )
}