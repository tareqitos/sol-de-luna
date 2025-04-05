import { View } from "lucide-react-native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import CardFiles from "./CardFiles";

export default function CardShowFiles({ item, openDocument }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>

                {item.documents.length > 0 && item.documents.map((file) => (
                    <TouchableOpacity
                        key={file.uri}
                        activeOpacity={0.9}
                        onPress={() => openDocument(file.uri)}
                        onLongPress={() => deleteDocument(item, file.name)}
                    >
                        <CardFiles file={file} openDocument={openDocument} />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        gap: 10
    }
})