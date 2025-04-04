import { TouchableOpacity } from "react-native";
import { s } from "../../styles/card.style";
import { UploadIcon } from "lucide-react-native";
import Txt from "../Txt";
import { useTheme } from "react-native-paper";

export default function AddFiles({ item, pickDocument }) {
    const { colors } = useTheme()
    return (
        <TouchableOpacity style={s.card.upload} onPress={() => pickDocument(item)}>
            <UploadIcon
                color={colors.onSecondary}
                size={14} />
            <Txt>Add a file</Txt>
        </TouchableOpacity>
    )
}