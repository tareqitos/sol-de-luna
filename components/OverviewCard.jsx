import { TouchableOpacity } from "react-native";
import Txt from "./Txt";
import { View } from "lucide-react-native";
import { Icon, Surface, useTheme } from "react-native-paper";
import { useData } from "../hook/data";

export default function OverviewCard({ updateTabName, categories }) {
    const { colors, typography } = useTheme();
    const { flights, hotels, transport } = useData();

    const categoryContent = {
        flights: {
            title: "Flights",
            icon: "airplane-takeoff",
            data: flights
        },

        hotels: {
            title: "Hotels",
            icon: "bed",
            data: hotels
        },

        transport: {
            title: "Transport",
            icon: "car",
            data: transport
        }
    }

    return (
        <>
            {categories.map((category) => (
                <TouchableOpacity key={category} onPress={() => updateTabName(category)} activeOpacity={1} style={{ flex: 1 }} >
                    <Surface style={[typography.body, { padding: 10, borderRadius: 10, backgroundColor: colors.surface }]} elevation={1}>
                        <Icon source={categoryContent[category].icon} size={18} />
                        <Txt>{categoryContent[category].title}</Txt>
                        <Txt style={typography.h1}>{categoryContent[category].data.length}</Txt>
                    </Surface>
                </TouchableOpacity>
            ))}
        </>
    )

}