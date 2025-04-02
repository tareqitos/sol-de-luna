import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import Txt from "../Txt";
import { FileText } from "lucide-react-native";

export default function Files({ file, openDocument }) {

    function File() {
        const extension = file.uri.split('.').pop().toLowerCase();

        return (
            <>
                {
                    ['jpg', 'jpeg', 'png'].includes(extension) ?
                        <View style={styles.file}>
                            <Image
                                source={{ uri: file.uri }}
                                style={styles.image} />
                        </View> :

                        <View style={styles.document}>
                            <FileText color="white" size={48} />
                            <Txt style={{ fontSize: 12, color: "white" }}>{`${file.name.substr(0, 5)}...${extension}`}</Txt>
                        </View>
                }
            </>
        )
    }

    return (

        <File />

    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },

    file: {
        justifyContent: "space-around",
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: "grey",
        overflow: "hidden"
    },

    document: {
        justifyContent: "space-around",
        alignItems: "center",
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: "#9575cd",
        overflow: "hidden"
    }
})