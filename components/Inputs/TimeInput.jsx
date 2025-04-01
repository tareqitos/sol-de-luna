import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { s } from "../../styles/styles.style";
import { useTheme } from "../../hook/theme";
import { TouchableOpacity } from "react-native";
import Txt from "../Txt";
import { ConvertTimetoString, DateTimeToTime } from "../../services/date-service";

export default function TimeInput({ time, setTime }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const { colors } = useTheme();

    const showTimePicker = () => {
        setIsPickerOpen(true);
    };

    const hideTimePicker = () => {
        setIsPickerOpen(false);
    };

    const handleConfirm = (time) => {
        setTime(time);
        console.warn("A time has been picked: ", DateTimeToTime(time));
        hideTimePicker();
    };

    useEffect(() => {
        console.log(DateTimeToTime(time))
    }, [])
    return (
        <>
            <Txt>Departure</Txt>
            <TouchableOpacity style={[s.form.input, { borderColor: colors.grey }]} onPress={showTimePicker}>
                <Txt style={{ fontFamily: "Inter-400" }}>{ConvertTimetoString(time)}</Txt>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isPickerOpen}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
            />
        </>
    )
}