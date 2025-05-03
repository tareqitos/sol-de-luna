import { TouchableOpacity } from "react-native";
import Txt from "../Utils/Txt";
import { Icon, Surface, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "../../locales/languagesConst";

export default function OverviewCard({ updateTabName, categories, types, t_categories }) {
    const { colors, typography } = useTheme();

    const categoryContent = {
        flights: {
            title: t_categories[0],
            icon: "airplane-takeoff",
            data: types.flights
        },

        hotels: {
            title: t_categories[1],
            icon: "bed",
            data: types.hotels
        },

        transport: {
            title: t_categories[2],
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