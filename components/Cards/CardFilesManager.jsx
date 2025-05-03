import { useState } from "react";
import { useDocument } from "../../hook/document";
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CardSection from "./CardSection";
import CardFiles from "./CardFiles";
import DialogPopUp from "../UI/Dialog";
import Txt from "../Utils/Txt";
import { MESSAGES } from "../../locales/languagesConst";
import { useTranslation } from "react-i18next";

export default function CardFilesManager({ item, destinationID }) {

    const { t } = useTranslation();
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
                title={t(MESSAGES.DELETE_FILE_TITLE)}
                content={<Txt>{t(MESSAGES.DELETE_FILE_CONTENT)}</Txt>}
                cancel={closeDialog}
                validate={confirmDelete}
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