import { Animated, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

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
import { useTranslation } from "react-i18next";
import { CATEGORIES, HOME } from "../locales/languagesConst";

export default function Home({ route }) {
    const { colors, typography } = useTheme();
    const { destinations } = useData()
    const { t } = useTranslation();

    const nav = useNavigation()
    const destinationId = route.params.destination.id
    const [destination, setDestination] = useState(route.params.destination);
    const [loading, setLoading] = useState(false)

    const overviewText = t(HOME.OVERVIEW);
    const upcomingText = t(HOME.UPCOMING);
    const t_categories = [t(CATEGORIES.FLIGHTS), t(CATEGORIES.HOTELS), t(CATEGORIES.TRANSPORT), t(CATEGORIES.HOME)]

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
    const isHomeTab = selectedTabName === "home";

    const updateSelectedTab = useCallback((name) => {
        // Don't show loading if we're going to home tab
        if (name === "home") {
            setSelectedTabName(name);
            setLoading(false);
            return;
        }

        // Only show loading when changing tabs and content needs to be prepared
        setLoading(true);

        // Use requestAnimationFrame instead of setTimeout to optimize with the screen refresh cycle
        requestAnimationFrame(() => {
            setSelectedTabName(name);

            // Use another animation frame to ensure the loading indicator was shown
            requestAnimationFrame(() => {
                // Add a small delay for better UX (make loading visible)
                setTimeout(() => setLoading(false), 100);
            });
        });
    }, []);

    // ANIMATION
    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        // Reset animation when tab changes
        animation.setValue(1);
        // Start animation
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
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
        if (loading) {
            // Reset animation when loading
            animation.setValue(0);
            return;
        }

        // Only animate when not loading
        animation.setValue(0);
        Animated.timing(animation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [selectedTabName, loading]);

    return (
        <Container >
            <View style={{ flex: 1, paddingHorizontal: 10, overflow: "visible" }}>

                <TouchableOpacity activeOpacity={.9} onPress={() => nav.goBack()} style={s.home.title} >
                    <Title title={destination.name || selectedTabName || "Overview"} textColor={colors.onBackground} />
                </TouchableOpacity>

                {selectedTabName === "home" ?
                    <View style={{ flex: 1, paddingHorizontal: 10 }} >

                        <ScrollView
                            contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 50 }}
                            showsVerticalScrollIndicator={false}
                            style={{ flex: 1 }}
                        >
                            <Txt style={[typography.h2, { marginBottom: 10, paddingHorizontal: 5 }]}>
                                {overviewText}
                            </Txt>
                            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                                <OverviewCard updateTabName={updateSelectedTab} categories={categories} types={types} t_categories={t_categories} />
                            </View>

                            <Txt style={[typography.h2, { paddingHorizontal: 5 }]}>
                                {upcomingText}
                            </Txt>
                            <Upcoming updatedTab={updateSelectedTab} categories={categories} types={types} t_categories={t_categories} />
                        </ScrollView>

                    </View>
                    : loading && !isHomeTab ?
                        <ActivityIndicator style={{ flex: 1 }} size={60} animating={loading} color={colors.primary} />
                        :
                        <ScrollView contentContainerStyle={{ padding: 5, gap: 20, paddingBottom: 40 }}
                            showsVerticalScrollIndicator={false}>
                            {!isHomeTab && !loading && (
                                <Animated.View style={slideIn}>
                                    <CardContainer
                                        category={selectedTabName}
                                        destination={destination}
                                        types={types}
                                        t_categories={t_categories}
                                    />
                                </Animated.View>
                            )}
                        </ScrollView>
                }
            </View>
            <View style={[s.home.tab_bottom_menu, { backgroundColor: colors.background, borderColor: colors.primary, borderTopWidth: 1, paddingBottom: Platform.OS === "ios" ? 10 : 20 }]}>
                <TabBottomMenu
                    selectedTabName={selectedTabName}
                    onPress={updateSelectedTab}
                    t_categories={t_categories}
                />
            </View>

            <FABMenu destination={destination} tab={selectedTabName} style={{ position: "absolute", bottom: "10%" }} />
        </Container>
    )
}