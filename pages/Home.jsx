import { Alert, Animated, Platform, ScrollView, Switch, View } from "react-native";
import { s } from "../styles/styles.style";
import Title from "../components/Title";
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useCallback, useEffect, useState } from "react";

import TabBottomMenu from "../components/TabBottomMenu";
import CardContainer from "../components/CardContainer";
import Container from "../components/Container";
import 'react-native-get-random-values';
import { useData } from "../hook/data";
import { useTheme } from "react-native-paper";
import { themeHook } from "../hook/theme";


export default function Home() {
    const { colors } = useTheme();
    const { toggleTheme } = themeHook();
    const { updateData } = useData()

    const [selectedTabName, setSelectedTabName] = useState("home")
    const categories = ["flights", "hotels", "transport"]

    const updateSelectedTab = useCallback((name) => {
        setSelectedTabName(name);
    }, []);



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

            const updateItem = { ...item, documents: [...item.documents || [], newFile] };
            updateData(updateItem)

            console.log("*** Document added!")

        } else {
            console.log('Document picking was cancelled')
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
            alert("Unable to open the document. Please try again.");
        }
    }

    const deleteDocument = (item, fileName) => {
        Alert.alert("Delete file", "Do you want to delete this file?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },

            {
                text: 'Delete',
                onPress: () => {
                    const filteredItem = item.documents.filter((file) => file.name !== fileName);
                    updateData({ ...item, documents: filteredItem });
                    console.log(filteredItem)
                }
            }
        ])
    }

    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        // Reset animation when tab changes
        animation.setValue(0);
        // Start animation
        Animated.timing(animation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [selectedTabName]);

    const slideIn = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                }),
            },
        ],
    };

    return (
        <Container style={{ padding: 10 }}>
            <View style={s.home.title} >
                <Title title={"Trips"} subtitle={"Overview"} textColor={colors.onBackground} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 5, gap: 20 }}>
                {categories.map((category) => (
                    <Animated.View key={category} style={[slideIn, {
                        display: (selectedTabName === category || selectedTabName === "home") ? 'flex' : 'none'
                    }]}>
                        <CardContainer
                            category={category}
                            pickDocument={pickDocument}
                            openDocument={openDocument}
                            deleteDocument={deleteDocument}
                        />
                    </Animated.View>
                ))}
            </ScrollView>

            <Switch
                style={{ position: "absolute", top: 70, right: 20 }}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
            />

            <View style={[s.home.tab_bottom_menu, { backgroundColor: colors.background }]}>
                <TabBottomMenu selectedTabName={selectedTabName} onPress={updateSelectedTab} />
            </View>
        </Container>
    )
}