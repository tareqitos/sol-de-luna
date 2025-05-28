import { View } from "react-native";
import { useData } from "../../hook/data";
import { useDocument } from "../../hook/document";
import { IconButton, useTheme } from "react-native-paper";

export default function CardAddFiles({ item, destinationID }) {
    const { colors } = useTheme()
    const { updateItem } = useData()
    const { pickDocument } = useDocument()

    const handlePickDocument = async () => {
        const newDocument = await pickDocument(item)
        updateItem(destinationID, newDocument)
        console.log("UPDATED ITEM: ", item)
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <IconButton icon={"file-upload-outline"} size={30} mode="contained" style={{}} iconColor={colors.onPrimary} containerColor={colors.primary} onPress={handlePickDocument} />
        </View>
    )
}