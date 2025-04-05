import { s } from "../../styles/card.style";
import { Button, useTheme } from "react-native-paper";

export default function CardAddFiles({ item, pickDocument }) {
    const { typography } = useTheme()
    return (
        <Button style={s.card.upload} labelStyle={typography.h5} icon={"file-upload-outline"} mode="contained" onPress={() => pickDocument(item)}>
            Add a file
        </Button>
    )
}