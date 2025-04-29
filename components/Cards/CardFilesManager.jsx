import { useState } from "react";
import { useDocument } from "../../hook/document";
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CardSection from "./CardSection";
import CardFiles from "./CardFiles";
import DialogPopUp from "../UI/Dialog";
import Txt from "../Utils/Txt";

export default function CardFilesManager({ item, destinationID }) {

    const { openDocument, deleteDocument } = useDocument();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);

    const handleDeleteFile = (file) => {
        setFileToDelete(file);
        setDialogVisible(true);
    };

    const confirmDelete = () => {
        deleteDocument(destinationID, item, fileToDelete);
        closeDialog();
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setFileToDelete(null);
    };
    return (
        <>
            {
                item.documents.length > 0 &&
                <CardSection style={styles.cardSection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.container}>

                            {item.documents.map((file) => (
                                <TouchableOpacity
                                    key={file.uri}
                                    activeOpacity={0.9}
                                    onPress={() => openDocument(file.uri)}
                                    onLongPress={() => Platform.OS === "android" ? handleDeleteFile(file.name) : deleteDocument(destinationID, item, file.name)}
                                >
                                    <CardFiles file={file} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </CardSection>
            }

            <DialogPopUp
                visible={dialogVisible}
                onDismiss={closeDialog}
                title="Delete File"
                content={<Txt>Are you sure you want to delete this file?</Txt>}
                cancel={closeDialog}
                validate={confirmDelete}
                validateText="Confirm"
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    cardSection: {
        marginVertical: 10,
        gap: 10
    }
})