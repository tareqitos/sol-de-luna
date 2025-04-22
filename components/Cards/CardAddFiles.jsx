import { View } from "react-native";
import { useData } from "../../hook/data";
import { useDocument } from "../../hook/document";
import { Button, IconButton, useTheme } from "react-native-paper";

export default function CardAddFiles({ item }) {
    const { colors } = useTheme()
    const { updateData } = useData()
    const { pickDocument } = useDocument()

    const handlePickDocument = async () => {
        const newDocument = await pickDocument(item)
        console.log(newDocument)
        updateData(newDocument)
    }

    return (
        // <Button style={s.card.upload} labelStyle={typography.h5} icon={"file-upload-outline"} mode="contained" onPress={handlePickDocument} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <IconButton icon={"file-upload-outline"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handlePickDocument} />
        </View>
    )
}