import { TouchableOpacity } from "react-native";
import Txt from "../Utils/Txt";
import { Icon, Surface, useTheme } from "react-native-paper";

export default function OverviewCard({ updateTabName, categories, types }) {
    const { colors, typography } = useTheme();

    const categoryContent = {
        flights: {
            title: "Flights",
            icon: "airplane-takeoff",
            data: types.flights
        },

        hotels: {
            title: "Hotels",
            icon: "bed",
            data: types.hotels
        },

        transport: {
            title: "Transport",
            icon: "car",
            data: types.transport
        }
    }

    return (
        <>
            {categories.map((category) => (
                <TouchableOpacity key={category} onPress={() => updateTabName(category)} activeOpacity={1} style={{ flex: 1 }} >
                    <Surface style={[typography.body, { padding: 10, borderRadius: 10, backgroundColor: colors.surface }]} elevation={1}>
                        <Icon source={categoryContent[category].icon} color={colors.primary} size={18} />
                        <Txt style={{ color: colors.primary }}>{categoryContent[category].title}</Txt>
                        <Txt style={[typography.h1, { color: colors.primary }]}>{categoryContent[category].data.length}</Txt>
                    </Surface>
                </TouchableOpacity>
            ))}
        </>
    )

}