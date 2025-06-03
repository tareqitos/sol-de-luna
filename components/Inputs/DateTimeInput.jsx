import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, View } from "react-native";
import { themeHook } from "../../hook/theme";
import { Button, Icon, useTheme } from "react-native-paper";
import { useLocalization } from "../../hook/localization";

export default function DateTimeInput({ label, time, setTime, date, setDate, hasDate = true, hasTime = true, hasCheckbox = false }) {
    const { theme } = themeHook()
    const { selected } = useLocalization();
    const { colors, typography } = useTheme()
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [mode, setMode] = useState('date');

    const showDatePicker = () => {
        setShowDate(true);
        setMode('date');
    };

    const showTimePicker = () => {
        setShowTime(true);
        setMode('time');
    };

    const today = new Date()
    const handleDateChange = (event, selectedValue) => {
        if (Platform.OS === 'android') {
            setShowDate(false);
            setShowTime(false);
        }

        if (selectedValue) {
            if (mode === 'date') {
                setDate(selectedValue);
                // After date is selected, show the time picker
                // if (Platform.OS === 'android') {
                //     setTimeout(() => {
                //         showTimePicker();
                //     }, 100);
                // }
            }
        }
    }

    const handleTimeChange = (event, selectedValue) => {
        if (Platform.OS === 'android') {
            setShowDate(false);
            setShowTime(false);
        }

        setTime(selectedValue)
    }

    const labelStyle = { marginHorizontal: 15, marginVertical: 5 }

    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon source={label} size={18} color={typography.caption.color} />
            {Platform.OS === "android" ? (
                <>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        {hasDate && <Button mode="outlined" labelStyle={labelStyle} onPress={showDatePicker}>
                            {date ? date.toLocaleDateString() : "Select date"}
                        </Button>}


                        {hasTime && <Button mode="outlined" labelStyle={labelStyle} onPress={showTimePicker}>
                            {time ? time.toLocaleTimeString(selected.tag, { hour: "2-digit", minute: "2-digit" }) : "Select time"}
                        </Button>}


                    </View>
                    {showDate && (
                        <DateTimePicker
                            mode="date"
                            value={date || new Date()}
                            onChange={handleDateChange}
                            themeVariant={theme}
                            minimumDate={today}
                            display="default"
                            style={{ background: colors.primary }}
                        />
                    )}

                    {showTime && (
                        <DateTimePicker
                            mode="time"
                            value={time || new Date()}
                            onChange={handleTimeChange}
                            themeVariant={theme}
                            is24Hour
                            display="default"
                        />
                    )}
                </>
            ) : (
                <View style={{ flexDirection: "row" }}>
                    {hasDate && (
                        <DateTimePicker
                            mode="date"
                            value={date || new Date()}
                            onChange={handleDateChange}
                            themeVariant={theme}
                            locale={selected.tag}
                            minimumDate={today}
                        />
                    )}
                    {hasTime && (
                        <DateTimePicker
                            mode="time"
                            value={time || new Date()}
                            onChange={handleTimeChange}
                            themeVariant={theme}
                            minimumDate={today}
                        />
                    )}
                </View>
            )}
        </View>
    );
}