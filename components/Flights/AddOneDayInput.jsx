import { useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { View } from "react-native";

export const AddOneDayInput = ({ date, setDate, setPlusOneDay }) => {
    const { colors } = useTheme();
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
        if (!checked) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            setPlusOneDay(true);
            setDate(newDate);
        } else {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1);
            setPlusOneDay(false);
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
                status={checked ? 'checked' : 'unchecked'}
                rippleColor='transparent'

                style={{ paddingHorizontal: 0, margin: 0 }}
            />
        </View>
    )
}