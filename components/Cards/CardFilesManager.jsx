import { useState } from "react";
import { useDocument } from "../../hook/document";
import { Animated, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CardSection from "./CardSection";
import CardFiles from "./CardFiles";
import DialogPopUp from "../UI/Dialog";
import Txt from "../Utils/Txt";
import { MESSAGES } from "../../locales/languagesConst";
import { useTranslation } from "react-i18next";
import { getScaleValue, handlePressIn, handlePressOut } from "../../services/animation-service";

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
                    <View style={styles.container}>

                        {item.documents.map((file) => {
                            const scaleValue = getScaleValue(file.uri)
                            return (
                                <Animated.View
                                    key={file.uri}
                                    style={{ transform: [{ scale: scaleValue }], overflow: "visible" }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPressIn={() => handlePressIn(0.9, file.uri)}
                                        onPressOut={() => handlePressOut(file.uri)}
                                        onPress={() => openDocument(file.uri)}
                                        onLongPress={() => Platform.OS === "android" ? handleDeleteFile(file.name) : deleteDocument(destinationID, item, file.name)}
                                    >
                                        <CardFiles file={file} />
                                    </TouchableOpacity>
                                </Animated.View>
                            )
                        })}
                    </View>
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
        flexWrap: "wrap",
        width: "auto",
        gap: 10
    },

    cardSection: {

        marginVertical: 10,
        gap: 10
    }
})