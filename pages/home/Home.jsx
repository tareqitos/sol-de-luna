import { ScrollView, Switch, View } from "react-native";
import { s } from "../../styles/styles.style";
import Title from "../../components/Title";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import { useTheme } from "../../hook/theme";
import TabBottomMenu from "../../components/TabBottomMenu";
import CardContainer from "../../components/CardContainer";
import Container from "../../components/Container";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid"
import { useData } from "../../hook/data";

export default function Home() {
    const [files, setFiles] = useState()
    const { colors, toggleTheme } = useTheme();
    const { data, setData } = useData()

    const [selectedTabName, setSelectedTabName] = useState("home")

    const updateSelectedTab = (name) => {
        setSelectedTabName(name)
    }


    console.log(data)
    // console.log(updatedData("flights"))

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        })

        if (result.canceled === false) {
            setFiles([...files, result.assets[0]])
            console.log(result.assets[0]);
        } else {
            console.log('Document picking was cancelled')
        }
    }

    return (
        <Container>
            <View style={s.home.title} >
                <Title title={"Trips"} subtitle={"Overview"} textColor={colors} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 10, gap: 20 }}>
                {Object.keys(data).map((category) => (
                    <CardContainer key={category} category={category} pickDocument={pickDocument} />
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