import { Animated, Platform, ScrollView, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

import { s } from "../styles/styles.style";


import Title from "../components/Utils/Title";
import TabBottomMenu from "../components/UI/TabBottomMenu";
import CardContainer from "../components/CardContainer";
import Container from "../components/Utils/Container";
import FABMenu from "../components/UI/FABMenu";
import Txt from "../components/Utils/Txt";
import { useData } from "../hook/data";
import OverviewCard from "../components/Home/OverviewCard";
import Upcoming from "../components/Home/Upcoming";
import { useNavigation } from "@react-navigation/native";

export default function Home({ route }) {
    const { colors, typography } = useTheme();
    const { destinations } = useData()

    const nav = useNavigation()
    const destinationId = route.params.destination.id
    const [destination, setDestination] = useState(route.params.destination);

    // Update destination when data changes
    useEffect(() => {
        const currentDestination = destinations.find(d => d.id === destinationId);
        if (currentDestination) {
            setDestination(currentDestination);
        }
    }, [destinations, destinationId]);

    if (!destination) return null;

    const types = {
        flights: destination.flights,
        hotels: destination.hotels,
        transport: destination.transport
    }
    const [selectedTabName, setSelectedTabName] = useState("home");
    const categories = ["flights", "hotels", "transport"];

    const updateSelectedTab = useCallback((name) => {
        setSelectedTabName(name);
    }, []);

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

    useEffect(() => {
        if (Platform.OS === "android") {
            const beforeRemoveHandler = (e) => {
                if (selectedTabName !== "home") {
                    e.preventDefault();
                    updateSelectedTab("home");
                }
            };

            const unsubscribe = nav.addListener('beforeRemove', beforeRemoveHandler);

            return () => {
                unsubscribe();
            };
        }
    }, [selectedTabName, nav]);

    return (
        <Container >
            <View style={{ flex: 1, paddingHorizontal: 10, overflow: "visible" }}>

                <View style={s.home.title} >
                    <Title title={"Trips"} subtitle={destination.name || selectedTabName || "Overview"} textColor={colors.onBackground} />
                </View>

                {selectedTabName === "home" ?
                    <View style={{ flex: 1, paddingHorizontal: 10 }} >

                        <ScrollView
                            contentContainerStyle={{ paddingHorizontal: 5 }}
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1 }}
                        >
                            <Txt style={[typography.h2, { marginBottom: 10, paddingHorizontal: 5 }]}>Overview</Txt>
                            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                                <OverviewCard updateTabName={updateSelectedTab} categories={categories} types={types} />
                            </View>

                            <Txt style={[typography.h2, { paddingHorizontal: 5 }]}>Upcoming trips</Txt>
                            <Upcoming updatedTab={updateSelectedTab} categories={categories} types={types} />
                        </ScrollView>

                    </View>
                    :
                    <ScrollView contentContainerStyle={{ padding: 5, gap: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                        {categories.map((category) => (
                            <Animated.View key={category} style={[slideIn, { display: (selectedTabName === category) ? 'flex' : 'none' }]}>
                                <CardContainer category={category} destination={destination} types={types} />
                            </Animated.View>
                        ))}
                    </ScrollView>
                }
            </View>
            <View style={[s.home.tab_bottom_menu, { backgroundColor: colors.background, paddingBottom: Platform.OS === "ios" ? 10 : 40 }]}>
                <TabBottomMenu selectedTabName={selectedTabName} onPress={updateSelectedTab} />
            </View>

            <FABMenu destination={destination} tab={selectedTabName} style={{ position: "absolute", bottom: "10%" }} />
        </Container>
    )
}