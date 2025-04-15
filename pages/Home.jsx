import { Animated, ScrollView, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

import { s } from "../styles/styles.style";


import Title from "../components/Title";
import TabBottomMenu from "../components/TabBottomMenu";
import CardContainer from "../components/CardContainer";
import Container from "../components/Container";
import SnackbarMessage from "../components/Snackbar";
import FABMenu from "../components/FABMenu";

export default function Home() {
    const { colors } = useTheme();

    const [selectedTabName, setSelectedTabName] = useState("home");
    const categories = ["flights", "hotels", "transport"];

    const updateSelectedTab = useCallback((name) => {
        setSelectedTabName(name);
    }, []);

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

            <SnackbarMessage />

            <ScrollView contentContainerStyle={{ padding: 5, gap: 20, paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
                {categories.map((category) => (
                    <Animated.View key={category} style={[slideIn, {
                        display: (selectedTabName === category || selectedTabName === "home") ? 'flex' : 'none'
                    }]}>
                        <CardContainer
                            category={category}
                        />
                    </Animated.View>
                ))}
            </ScrollView>
            <View style={[s.home.tab_bottom_menu, { backgroundColor: colors.background }]}>
                <TabBottomMenu selectedTabName={selectedTabName} onPress={updateSelectedTab} />
            </View>

            <FABMenu style={{ position: "absolute", bottom: "10%" }} />


        </Container>
    )
}