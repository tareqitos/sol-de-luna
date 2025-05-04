import { Text, useWindowDimensions } from "react-native";
import { s } from "../../styles/styles.style";
import { useTheme } from "react-native-paper";
import { memo } from "react";

const Txt = memo(({ children, style }) => {
    const { colors } = useTheme();
    const { height } = useWindowDimensions();
    const fontSize = style?.fontSize || s.text.text.fontSize
    const adpatedFontsize = fontSize * 0.0011 * height

    return (
        <Text style={[s.text.text, { color: colors.onBackground, fontSize: adpatedFontsize }, style]}>{children}</Text>
    )
});

export default memo(Txt);