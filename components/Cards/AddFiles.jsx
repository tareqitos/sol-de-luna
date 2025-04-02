import { TouchableOpacity } from "react-native";
import { s } from "../../styles/card.style";
import { UploadIcon } from "lucide-react-native";
import Txt from "../Txt";

export default function AddFiles({ item, pickDocument }) {
    return (
        <TouchableOpacity style={s.card.upload} onPress={() => pickDocument(item)}>
            <UploadIcon
                color="#647457"
                size={14} />
            <Txt>Add a file</Txt>
        </TouchableOpacity>
    )
}