import { useState } from "react";
import { s } from "../../styles/styles.style";
import { useTheme } from "../../hook/theme";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Txt from "../Txt";
import { ConvertDateAndTimeToString } from "../../services/date-service";
import DateTimePicker from "react-native-ui-datepicker";
import Collapsible from "react-native-collapsible";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react-native";

export default function DateInput({ newDate, setNewDate }) {
    const [isPickerOpen, setIsPickerOpen] = useState();

    let today = new Date(Date.now());
    const { colors } = useTheme();

    const showDatePicker = () => {
        setIsPickerOpen(!isPickerOpen);
    };

    const icons = {
        IconPrev: (<ChevronLeft color={colors.text} size={18} />),
        IconNext: (<ChevronRight color={colors.text} size={18} />),
    }

    return (
        <>
            <Txt>Date</Txt>
            <TouchableOpacity activeOpacity={.8} style={[s.form.input, { borderColor: colors.grey }]} onPress={showDatePicker}>
                <Txt style={{ fontFamily: "Inter-400", color: !newDate && colors.grey }}>{!newDate ? "Departure time" : ConvertDateAndTimeToString(newDate)}</Txt>
                {isPickerOpen && <CircleCheck style={{ position: "absolute", right: "10" }} color={colors.border} size={24} />}
            </TouchableOpacity>
            <Collapsible collapsed={!isPickerOpen} collapsedHeight={0} duration={300} renderChildrenCollapsed={true}>
                <DateTimePicker
                    timePicker
                    showOutsideDays
                    mode="single"
                    date={newDate}
                    minDate={today}
                    onChange={({ date }) => {
                        setNewDate(date)
                    }}
                    containerHeight={300}
                    components={{ ...icons }}
                    style={[s.calendar.background, { backgroundColor: colors.background }]}
                    styles={{
                        today: [s.calendar.day, { borderColor: "grey" }], // Add a border to today's date
                        selected: [s.calendar.day_cell, { backgroundColor: colors.border }], // Highlight the selected day
                        selected_label: { color: 'white' }, // Highlight the selected day label

                        day_cell: s.calendar.day_cell,
                        outside: { opacity: .5 },
                        outside_label: { opacity: .5 },

                        year_selector_label: s.calendar.header,
                        month_selector_label: s.calendar.header,
                        time_selector_label: s.calendar.header
                    }}
                />
            </Collapsible>
        </>
    )
}