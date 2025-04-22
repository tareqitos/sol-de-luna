import { Button } from "react-native-paper";
import { useData } from "../hook/data";
import { exportJsonViaShare } from "../services/import-export-service";


export default function Export() {

    const { flights, hotels, transport } = useData()

    return (
        <Button icon="export" onPress={() => exportJsonViaShare([{ flights, hotels, transport }])} />
    )
}