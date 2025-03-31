import { Animated, Button, ScrollView, Switch, View } from "react-native";
import { s } from "../styles/styles.style";
import Title from "../components/Title";
import * as DocumentPicker from 'expo-document-picker';
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../hook/theme";
import TabBottomMenu from "../components/TabBottomMenu";
import CardContainer from "../components/CardContainer";
import Container from "../components/Container";
import 'react-native-get-random-values';
import { useData } from "../hook/data";
export default function Home() {
    const [files, setFiles] = useState()
    const { colors, toggleTheme } = useTheme();
    const { data, setData } = useData()

    const [selectedTabName, setSelectedTabName] = useState("home")

    const updateSelectedTab = useCallback((name) => {
        setSelectedTabName(name);
    }, []);


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
        <Container>
            <View style={s.home.title} >
                <Title title={"Trips"} subtitle={"Overview"} textColor={colors} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 10, gap: 20 }}>
                <Animated.View style={[slideIn, {
                    display: (selectedTabName === "flights" || selectedTabName === "home") ? 'flex' : 'none'
                }]}>
                    <CardContainer
                        key="flights"
                        category="flights"
                        items={data.flights || []}
                        pickDocument={pickDocument}
                    />
                </Animated.View>
                <Animated.View style={[slideIn, {
                    display: (selectedTabName === "hotels" || selectedTabName === "home") ? 'flex' : 'none'
                }]}>
                    <CardContainer
                        key="hotels"
                        category="hotels"
                        items={data.hotels || []}
                        pickDocument={pickDocument}
                    />
                </Animated.View>
                <Animated.View style={[slideIn, {
                    display: (selectedTabName === "transport" || selectedTabName === "home") ? 'flex' : 'none'
                }]}>
                    <CardContainer
                        key="transport"
                        category="transport"
                        items={data.transport || []}
                        pickDocument={pickDocument}
                    />
                </Animated.View>
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