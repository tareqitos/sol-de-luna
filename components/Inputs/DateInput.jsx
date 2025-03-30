import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { s } from "../../styles/styles.style";
import { useTheme } from "../../hook/theme";
import { TouchableOpacity, View } from "react-native";
import Txt from "../Txt";

export default function DateInput({ date, setDate }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const { colors } = useTheme();

    const showDatePicker = () => {
        setIsPickerOpen(true);
    };

    const hideDatePicker = () => {
        setIsPickerOpen(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    return (
        <>
            <Txt>Date</Txt>
            <TouchableOpacity style={[s.form.input, { borderColor: colors.grey }]} onPress={showDatePicker}>
                <Txt style={{ fontFamily: "Inter-400" }}>{date.toLocaleDateString()}</Txt>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isPickerOpen}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}