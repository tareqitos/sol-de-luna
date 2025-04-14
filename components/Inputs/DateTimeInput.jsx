import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Platform, View } from "react-native";
import { themeHook } from "../../hook/theme";
import Txt from "../Txt";
import { TextInput, useTheme } from "react-native-paper";
import { ConvertDateAndTimeToString, mergeDateAndTime } from "../../services/date-service";

export default function DateTimeInput({ label, time, setTime, date, setDate }) {
    const { theme } = themeHook()
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
    const handleChange = (event, selectedValue) => {
        if (Platform.OS === 'android') {
            setShowDate(false);
            setShowTime(false);
        }

        if (selectedValue) {
            if (mode === 'date') {
                setDate(selectedValue);
                // After date is selected, show the time picker
                if (Platform.OS === 'android') {
                    setTimeout(() => {
                        showTimePicker();
                    }, 100);
                } else {
                    showTimePicker();
                }
            } else if (mode === 'time') {
                setTime(selectedValue);
            } else if (mode === 'datetime') {
                setDate(selectedValue);
                setTime(selectedValue);
            }
        }
    };

    console.log(mergeDateAndTime(date, time))

    return (
        <View>
            <Txt style={[typography.caption, { marginBottom: 10 }]}>{label}</Txt>
            {Platform.OS === "android" ? (
                <>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Button
                            onPress={showDatePicker}
                            title={date ? date.toLocaleDateString() : "Select date"}
                        />
                        <Button
                            onPress={showTimePicker}
                            title={time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Select time"}
                        />
                    </View>
                    {showDate && (
                        <DateTimePicker
                            mode="date"
                            value={date || new Date()}
                            onChange={handleChange}
                            themeVariant={theme}
                            minimumDate={today}
                            design="material"
                            style={{ background: colors.primary }}
                        />
                    )}
                    {showTime && (
                        <DateTimePicker
                            mode="time"
                            value={time || new Date()}
                            onChange={handleChange}
                            themeVariant={theme}
                            design="material"
                        />
                    )}
                </>
            ) : (
                <View style={{ flexDirection: "row" }}>
                    <DateTimePicker
                        mode="date"
                        value={date || new Date()}
                        onChange={handleChange}
                        themeVariant={theme}
                        locale="en"
                        minimumDate={today}
                    />

                    <DateTimePicker
                        mode="time"
                        value={time || new Date()}
                        onChange={handleChange}
                        themeVariant={theme}
                        locale="en"
                        minimumDate={today}
                    />
                </View>
            )}
        </View>
    );
}