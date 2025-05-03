import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { filteredDataByDateAsc, filteredDataByDateDesc } from "../../services/sort-service";
import { useEffect, useState } from "react";

export default function FilterCards({ dateAsc, nameAsc, filterByName, filterByDate }) {
    const { colors } = useTheme()

    return (
        <View style={{ flexDirection: "row", padding: 0 }}>
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