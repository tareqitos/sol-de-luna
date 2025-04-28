import { createContext, useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { Alert, Platform } from "react-native";
import { useData } from "../hook/data";

export const DocumentContext = createContext({
    pickDocument: async () => { },
    openDocument: async () => { },
    deleteDocument: () => { },
})

export function DocumentProvider({ children }) {
    const { updateItem, deleteItem } = useData()
    const [visible, setVisible] = useState(false)

    const pickDocument = async (item) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        })

        if (!result.canceled) {
            const newFile = {
                name: result.assets[0].name,
                uri: result.assets[0].uri
            }

            return { ...item, documents: [...item.documents, newFile] };
        } else {
            return console.log('Document picking was cancelled')
        }
    }

    const openDocument = async (fileURI) => {
        try {
            const extension = fileURI.split('.').pop().toLowerCase();
            let mimeType = "*/*";

            if (['jpg', 'jpeg', 'png'].includes(extension)) mimeType = `image/${extension}`;
            if (['mp4', 'mov'].includes(extension)) mimeType = `video/${extension}`;
            if (['doc', 'docx'].includes(extension)) mimeType = 'application/msword';
            if (['pdf'].includes(extension)) mimeType = 'application/pdf';

            if (Platform.OS === "ios") {
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(fileURI);
                } else {
                    console.log("Sharing not available on this device");
                    alert("Cannot open this document");
                }
            } else {
                FileSystem.getContentUriAsync(fileURI).then(uri => {
                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: uri,
                        flags: 1,
                        type: mimeType,
                    });
                });
            }


        } catch (error) {
            console.error("Error opening document:", error);
            return alert("Unable to open the document. Please try again.");
        }
    }

    const deleteDocument = (destinationID, item, fileName) => {

        if (Platform.OS === "android") {
            const filteredItem = item.documents.filter((file) => file.name !== fileName);
            updateItem(destinationID, { ...item, documents: filteredItem });
        } else {
            Alert.alert("Delete file", "Do you want to delete this file?", [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },

                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const filteredItem = item.documents.filter((file) => file.name !== fileName);
                        updateItem(destinationID, { ...item, documents: filteredItem });
                    }
                }
            ])
        }
    }

    return (
        <DocumentContext.Provider value={{ pickDocument, openDocument, deleteDocument }}>
            {children}
        </DocumentContext.Provider>
    )
}