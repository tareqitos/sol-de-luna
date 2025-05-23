import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export default function FilterCards({ dateAsc, nameAsc, showComplete, filterByName, filterByDate, filterOutCompletedCard }) {
    const { colors } = useTheme()

    return (
        <View style={{ flexDirection: "row", padding: 0 }}>
            <IconButton
                icon="passport-biometric"
                size={22}
                onPress={filterOutCompletedCard}
                animated
                iconColor={showComplete ? colors.primary : colors.grey}
                style={{ margin: 0 }}

            />
            <IconButton
                icon={nameAsc ? "sort-alphabetical-ascending" : "sort-alphabetical-descending"}
                size={22}
                onPress={filterByName}
                animated
                iconColor={colors.primary}
                style={{ margin: 0 }}
            />
            <IconButton
                icon={dateAsc ? "sort-clock-ascending-outline" : "sort-clock-descending-outline"}
                size={22}
                onPress={filterByDate}
                animated
                iconColor={colors.primary}
                style={{ margin: 0 }}
            />
        </View>
    )
}