import { View } from "react-native";
import { useData } from "../../hook/data";
import { useDocument } from "../../hook/document";
import { Button, IconButton, useTheme } from "react-native-paper";

export default function CardAddFiles({ item, destinationID }) {
    const { colors } = useTheme()
    const { updateItem } = useData()
    const { pickDocument } = useDocument()

    const handlePickDocument = async () => {
        const newDocument = await pickDocument(item)
        // console.log("NEW DOCUMENT: ", newDocument)
        updateItem(destinationID, newDocument)
        console.log("UPDATED ITEM: ", item)
    }

    return (
        // <Button style={s.card.upload} labelStyle={typography.h5} icon={"file-upload-outline"} mode="contained" onPress={handlePickDocument} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <IconButton icon={"file-upload-outline"} size={30} mode="contained" style={{ width: "100%" }} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handlePickDocument} />
        </View>
    )
}