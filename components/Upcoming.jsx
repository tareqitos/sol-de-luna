import { List, Surface, useTheme } from "react-native-paper";
import { useData } from "../hook/data";
import Txt from "./Txt";
import { ScrollView, StyleSheet } from "react-native";

export default function Upcoming({ updatedTab, categories }) {
    const { flights, hotels, transport } = useData();

    const { colors, typography } = useTheme();

    const sortItems = flights.sort((x, y) => {
        return new Date(x) - new Date(y);
    });


    const categoryContent = {
        flights: {
            title: "Flights",
            icon: "airplane-takeoff",
            data: flights.sort((x, y) => {
                return new Date(x.departureDate) - new Date(y.departureDate);
            })
        },

        hotels: {
            title: "Hotels",
            icon: "bed",
            data: hotels.sort((x, y) => {
                return new Date(x.checkIn) - new Date(y.checkIn);
            })
        },

        transport: {
            title: "Transport",
            icon: "car",
            data: transport.sort((x, y) => {
                return new Date(x.departureTime) - new Date(y.departureTime);
            })
        }
    }

    return (
        <>
            {categories.map((category) => (
                categoryContent[category].data.length > 0 &&
                <List.Section key={category}>
                    <List.Subheader>{categoryContent[category].title}</List.Subheader>
                    <Surface style={[styles.section, { backgroundColor: colors.surface }]} elevation={1}>
                        {categoryContent[category].data.map((item) => (
                            <List.Item
                                key={item.id}
                                title={item.name || item.arrival}
                                left={() => <List.Icon icon={categoryContent[category].icon} />}
                                right={() => <Txt>{new Date(item.departureDate || item.checkIn || item.departureTime).toDateString()}</Txt>}
                                contentContainerStyle={{ justifyContent: "center" }}
                            />
                        ))}
                    </Surface>
                </List.Section>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10
    }
})