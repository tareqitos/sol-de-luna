import { useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { View } from "react-native";

export const AddOneDayInput = ({ date, setDate, plusOneDay, setPlusOneDay }) => {
    const { colors } = useTheme();

    const handleCheckboxChange = () => {
        setPlusOneDay(!plusOneDay);
        if (!plusOneDay) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            setDate(newDate);
        } else {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1);
            setDate(newDate);
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox.Item
                label="+1 day"
                position="leading"
                onPress={handleCheckboxChange}
                color={colors.primary}
                status={plusOneDay ? 'checked' : 'unchecked'}
                rippleColor='transparent'

                style={{ paddingHorizontal: 0, margin: 0 }}
            />
        </View>
    )
}
