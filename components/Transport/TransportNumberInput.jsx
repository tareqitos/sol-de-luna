import { useState } from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { s } from "../../styles/styles.style";

export default function TransportNumberInput({ line, setLine }) {
    const { colors, typography } = useTheme();

    return (
        <View>
            <TextInput
                label="Line"
                mode="flat"
                value={line}
                onChangeText={setLine}
                placeholder="e.g. 42, 2B..."
                placeholderTextColor={typography.caption.color}
                style={[
                    s.form.input,
                    line && line.length == 0 ? typography.caption : typography.body,
                    { color: colors.onBackground, backgroundColor: colors.background }
                ]}
                right={
                    <TextInput.Icon icon="transit-connection-horizontal" style={{ alignSelf: "baseline" }} size={18} />
                }
            />
        </View>
    )
}