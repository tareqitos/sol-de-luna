import { useData } from "../../hook/data";
import { useDocument } from "../../hook/document";
import { s } from "../../styles/card.style";
import { Button, useTheme } from "react-native-paper";

export default function CardAddFiles({ item }) {
    const { typography } = useTheme()
    const { updateData } = useData()
    const { pickDocument } = useDocument()

    const handlePickDocument = async () => {
        const newDocument = await pickDocument(item)
        console.log(newDocument)
        updateData(newDocument)
    }

    return (
        <Button style={s.card.upload} labelStyle={typography.h5} icon={"file-upload-outline"} mode="contained" onPress={handlePickDocument}>
            Add a file
        </Button>
    )
}