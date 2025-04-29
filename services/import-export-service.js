import * as FileSystem from "expo-file-system"
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";
import * as DocumentPicker from 'expo-document-picker';


export const exportDataToJSON = async (data) => {
    const json = JSON.stringify(data, null, 2);
    const filename = `flights_data_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const fileUri = FileSystem.documentDirectory + filename;

    try {
        await FileSystem.writeAsStringAsync(fileUri, json);

        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const uri = await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    filename,
                    'application/json'
                );
                await FileSystem.writeAsStringAsync(uri, json);
                return true;
            }
        } else {
            await shareAsync(fileUri);
            return false;
        }



    } catch (error) {
        console.error(error);
    }
};

export const importJSONData = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/json",
            copyToCacheDirectory: true,
        });

        if (result.canceled === true) {
            return console.log("Action canceled by user");
        }

        const file = result.assets[0]

        const fileUri = file.uri;
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const parsedContent = JSON.parse(fileContent);
        console.log("Imported JSON Data:", parsedContent);
        return parsedContent;

    } catch (error) {
        console.error("Error importing JSON data:", error);
    }
};
