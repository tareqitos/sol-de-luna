import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import CardFiles from "./CardFiles";
import { v4 as uuidv4 } from 'uuid';

export default function CardShowFiles({ item, openDocument }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>

                {item.documents.length > 0 && item.documents.map((file) => (
                    <TouchableOpacity
                        key={uuidv4()}
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