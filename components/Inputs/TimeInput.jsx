import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button, Platform } from "react-native";
import { themeHook } from "../../hook/theme";

export default function TimeInput({ time, setTime }) {
    const { theme } = themeHook();
    const [show, setShow] = useState(false);

    const showTimePicker = () => {
        setShow(true);
    };

    const handleChange = (selectedTime) => {
        setShow(Platform.OS === 'ios'); // Keep open on iOS, close on Android
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    return (
        <View>
            {Platform.OS === "android" &&
                <Button
                    onPress={showTimePicker}
                    title={time ? time.toLocaleTimeString() : "Select time"}
                />}

            {show &&
                <DateTimePicker
                    mode="time"
                    value={time || new Date()}
                    onChange={handleChange}
                    timeZoneName="UTC"
                    themeVariant={theme}
                    locale="en"
                    design="material"
                    initialInputMode="default"
                />}
        </View>
    );
}