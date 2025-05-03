import { Badge, Chip, Divider, IconButton, List, Surface, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { calculateDayBetweenTwoDates, ConvertDateToString } from "../../services/date-service";
import { showLocation } from "react-native-map-link";

export default function Upcoming({ updatedTab, categories, types, t_categories }) {

    const { colors, typography } = useTheme();

    const categoryContent = {
        flights: {
            title: t_categories[0],
            icon: "airplane-takeoff",
            data: types.flights.sort((x, y) => {
                return new Date(x.departureDate) - new Date(y.departureDate);
            })
        },

        hotels: {
            title: t_categories[1],
            icon: "bed",
            data: types.hotels.sort((x, y) => {
                return new Date(x.checkIn) - new Date(y.checkIn);
            })
        },

        transport: {
            title: t_categories[2],
            icon: "car",
            data: types.transport.sort((x, y) => {
                return new Date(x.departureTime) - new Date(y.departureTime);
            })
        }
    }

    const openMapApp = (item) => {
        showLocation({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.address,
            address: !item.latitude ? item.address : null
        })
    }


    const Infos = (category, item) => {
        return (

            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                {category === "flights" ?
                    <>
                        <Chip icon="account-outline" mode="outlined">{item.passengers.length}</Chip>
                        {item.documents.length > 0 && <Chip icon="file-outline" mode="outlined">{item.documents.length}</Chip>}
                    </>
                    : category === "hotels" ?
                        <>
                            <Chip icon="weather-night" mode="outlined">{calculateDayBetweenTwoDates(item.checkIn, item.checkOut)}</Chip>
                            {item.documents.length > 0 && <Chip icon="file-outline" mode="outlined">{item.documents.length}</Chip>}

                            <IconButton icon="map-search-outline" iconColor={colors.primary} size={18} mode="outlined" style={{ borderColor: colors.primary }} onPress={() => openMapApp(item)} />
                        </>
                        : category === "transport" ?
                            <>
                                {item.documents.length > 0 && <Chip icon="file-outline" mode="outlined">{item.documents.length}</Chip>}
                            </>
                            : null
                }
            </View>

        )
    }

    return (
        <View>
            {categories.map((category) => (
                categoryContent[category].data.length > 0 &&
                <List.Section key={category}>
                    <List.Subheader>{categoryContent[category].title}</List.Subheader>
                    <Surface style={[styles.section, { backgroundColor: colors.surface }]} elevation={1}>
                        {categoryContent[category].data.slice(0, 3).map((item, index, array) => (
                            <TouchableOpacity activeOpacity={1} onPress={() => updatedTab(category)} key={item.id}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <List.Item
                                        title={item.name || item.arrival}
                                        left={() => <List.Icon icon={category === "transport" ? item.transportType : categoryContent[category].icon} />}
                                        description={() => <Txt style={[typography.bodyInter, { opacity: .5 }]}>{ConvertDateToString(item.departureDate || item.checkIn || item.departureTime)}</Txt>}
                                        contentStyle={{ justifyContent: "center" }}
                                        titleStyle={typography.body}
                                        style={{ flex: 1 }}

                                    />
                                    {Infos(category, item)}
                                </View>
                                {index < array.length - 1 && <Divider />}
                            </TouchableOpacity>
                        ))}
                    </Surface>
                </List.Section>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 15,
        paddingVertical: 0,
        borderRadius: 10
    }
})