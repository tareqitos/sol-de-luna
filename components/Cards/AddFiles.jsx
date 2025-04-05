import { TouchableOpacity } from "react-native";
import { s } from "../../styles/card.style";
import { UploadIcon } from "lucide-react-native";
import Txt from "../Txt";
import { Button, useTheme } from "react-native-paper";

export default function AddFiles({ item, pickDocument }) {
    const { colors, typography } = useTheme()
    return (
        <Button style={s.card.upload} labelStyle={typography.h5} icon={"file-upload-outline"} mode="contained" onPress={() => pickDocument(item)}>
            Add a file
        </Button>
    )
}