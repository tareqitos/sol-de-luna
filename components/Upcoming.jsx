import { Divider, List, MD3DarkTheme, PaperProvider, Surface, useTheme } from "react-native-paper";
import { useData } from "../hook/data";
import Txt from "./Txt";
import { ScrollView, StyleSheet, View } from "react-native";
import { ConvertDateToString } from "../services/date-service";

export default function Upcoming({ updatedTab, categories, types }) {

    const { colors, typography } = useTheme();
    const highlight = (index) => index === 0 ? colors.primary : colors.onSurface

    const categoryContent = {
        flights: {
            title: "Flights",
            icon: "airplane-takeoff",
            data: types.flights.sort((x, y) => {
                return new Date(x.departureDate) - new Date(y.departureDate);
            })
        },

        hotels: {
            title: "Hotels",
            icon: "bed",
            data: types.hotels.sort((x, y) => {
                return new Date(x.checkIn) - new Date(y.checkIn);
            })
        },

        transport: {
            title: "Transport",
            icon: "car",
            data: types.transport.sort((x, y) => {
                return new Date(x.departureTime) - new Date(y.departureTime);
            })
        }
    }

    return (
        <View>
            {categories.map((category) => (
                categoryContent[category].data.length > 0 &&
                <List.Section key={category}>
                    <List.Subheader>{categoryContent[category].title}</List.Subheader>
                    <Surface style={[styles.section, { backgroundColor: colors.surface }]} elevation={1}>
                        {categoryContent[category].data.slice(0, 3).map((item, index, array) => (
                            <View key={item.id}>
                                <List.Item
                                    title={item.name || item.arrival}
                                    left={() => <List.Icon icon={categoryContent[category].icon} color={highlight(index)} />}
                                    description={() => <Txt style={{ color: highlight(index) }}>{ConvertDateToString(item.departureDate || item.checkIn || item.departureTime)}</Txt>}
                                    contentStyle={{ justifyContent: "center" }}
                                    titleStyle={{ color: highlight(index) }}
                                />
                                {index < array.length - 1 && <Divider />}
                            </View>
                        ))}
                    </Surface>
                </List.Section>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 10
    }
})