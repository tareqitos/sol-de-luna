import { useState } from "react";
import { s } from "../../styles/styles.style";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Txt from "../Txt";
import { ConvertDateAndTimeToString } from "../../services/date-service";
import DateTimePicker from "react-native-ui-datepicker";
import Collapsible from "react-native-collapsible";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react-native";
import { Button, useTheme } from "react-native-paper";

export default function DateInput({ newDate, setNewDate }) {
    const [isPickerOpen, setIsPickerOpen] = useState();

    let today = new Date(Date.now());
    const { colors, opacity, typography } = useTheme();

    const showDatePicker = () => {
        setIsPickerOpen(!isPickerOpen);
    };

    const icons = {
        IconPrev: (<ChevronLeft color={colors.primary} size={18} />),
        IconNext: (<ChevronRight color={colors.primary} size={18} />),
    }

    return (
        <>
            <Txt style={typography.h4}>Date</Txt>
            <TouchableOpacity activeOpacity={.8} style={[s.form.input, { borderColor: typography.caption.color }]} onPress={showDatePicker}>
                <Txt style={!newDate ? typography.caption : typography.bodyInter}>{!newDate ? "Departure time" : ConvertDateAndTimeToString(newDate)}</Txt>
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
                    style={[s.calendar.background, { backgroundColor: colors.surface }]}
                    styles={{
                        // Day styles
                        day_cell: [s.calendar.day_cell, { color: colors.secondary }],
                        day_label: { color: colors.onBackground },
                        selected: [s.calendar.day_cell, { backgroundColor: colors.primary }],
                        selected_label: { color: colors.surface },
                        today: [s.calendar.day, { borderColor: colors.onSurface }],

                        // Outside day styles
                        outside: { opacity: opacity.disabled },
                        outside_label: { opacity: opacity.disabled },
                        disabled: { opacity: opacity.disabled },
                        disabled_label: { opacity: opacity.disabled },

                        // Week styles
                        weekday_label: { color: colors.primary },

                        // Month styles
                        month_label: { color: colors.onBackground },
                        selected_month_label: { color: colors.primary },

                        // Year styles
                        year_label: { color: colors.onBackground },
                        selected_year_label: { color: colors.primary },

                        // Header styles
                        month_selector_label: [s.calendar.header, { color: colors.onSurface }],
                        year_selector_label: [s.calendar.header, { color: colors.onSurface }],
                        time_selector_label: [s.calendar.header, { color: colors.onSurface }],

                        // Time styles
                        time_label: { color: colors.onBackground },
                    }}
                />
                {isPickerOpen &&
                    <Button style={{ position: "absolute", right: 0, bottom: 20 }} onPress={() => setIsPickerOpen(false)}>
                        <CircleCheck color={colors.primary} size={24} />
                    </Button>
                }

            </Collapsible>
        </>
    )
}