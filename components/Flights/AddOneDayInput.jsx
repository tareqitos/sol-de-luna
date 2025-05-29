import { useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { FORM } from "../../locales/languagesConst";

export const AddOneDayInput = ({ date, setDate, plusOneDay, setPlusOneDay }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

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
                label={t(FORM.PLUS_ONE_DAY)}
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
