import { Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Icon, List, Surface, useTheme } from "react-native-paper";

import { s } from "../styles/styles.style";


import Title from "../components/Title";
import TabBottomMenu from "../components/TabBottomMenu";
import CardContainer from "../components/CardContainer";
import Container from "../components/Container";
import SnackbarMessage from "../components/Snackbar";
import FABMenu from "../components/FABMenu";
import Txt from "../components/Txt";
import { useData } from "../hook/data";
import { useNavigation } from "@react-navigation/native";
import OverviewCard from "../components/OverviewCard";
import Upcoming from "../components/Upcoming";
import IataInput from "../components/Inputs/IataInput";

export default function Home() {
    const { colors, typography } = useTheme();
    const { flights, hotels, transport } = useData();

    const [selectedTabName, setSelectedTabName] = useState("home");
    const categories = ["flights", "hotels", "transport"];

    const updateSelectedTab = useCallback((name) => {
        setSelectedTabName(name);
    }, []);

    const sortedFlights = flights.sort((x, y) => {
        return new Date(x.departureDate) - new Date(y.departureDate);
    });

    // ANIMATION
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
                <Title title={"Trips"} subtitle={selectedTabName || "Overview"} textColor={colors.onBackground} />
            </View>

            <SnackbarMessage />

            {selectedTabName === "home" ?
                <View style={{ paddingHorizontal: 10 }}>
                    <Txt style={[typography.h2, { marginBottom: 10 }]}>Overview</Txt>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <OverviewCard updateTabName={updateSelectedTab} categories={categories} />
                    </View>

                    <Txt style={[typography.h2, { marginBottom: 10 }]}>Upcoming trips</Txt>
                    <View>
                        <Upcoming updatedTab={updateSelectedTab} categories={categories} />
                    </View>

                </View>
                :
                <ScrollView contentContainerStyle={{ padding: 5, gap: 20, paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
                    {categories.map((category) => (
                        <Animated.View key={category} style={[slideIn, { display: (selectedTabName === category) ? 'flex' : 'none' }]}>
                            <CardContainer category={category} />
                        </Animated.View>
                    ))}
                </ScrollView>
            }
            <View style={[s.home.tab_bottom_menu, { backgroundColor: colors.background }]}>
                <TabBottomMenu selectedTabName={selectedTabName} onPress={updateSelectedTab} />
            </View>

            <FABMenu tab={selectedTabName} style={{ position: "absolute", bottom: "10%" }} />


        </Container>
    )
}