import { useState } from "react";
import { s } from "../../styles/styles.style";
import { ConvertDateAndTimeToString } from "../../services/date-service";
import DateTimePicker from "react-native-ui-datepicker";
import Collapsible from "react-native-collapsible";
import { ChevronLeft, ChevronRight, CircleCheck } from "lucide-react-native";
import { Button, Icon, IconButton, Modal, Portal, TextInput, useTheme } from "react-native-paper";

export default function DateInput({ label, newDate, setNewDate, style }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(true)

    let today = new Date(Date.now());
    const { colors, opacity, typography } = useTheme();

    const toggleDatePicker = () => {
        setIsPickerOpen(!isPickerOpen);
        setIsEditable(!isEditable)
    };

    const icons = {
        IconPrev: (<ChevronLeft color={colors.primary} size={18} />),
        IconNext: (<ChevronRight color={colors.primary} size={18} />),
    }

    return (
        <>
            <TextInput
                label={label}
                mode="flat"
                onFocus={toggleDatePicker}
                style={[s.form.input, style, !newDate ? typography.caption : typography.bodyInter, { backgroundColor: colors.background }]}
                value={!newDate ? ConvertDateAndTimeToString(new Date().setHours(12, 0, 0)) : ConvertDateAndTimeToString(newDate)}
                outlineColor={typography.caption.color}
                editable={isEditable}
                // placeholder={ConvertDateAndTimeToString(new Date(Date.now()))}
                autoCorrect={false}

            />

            <Portal>
                <Modal visible={isPickerOpen} onDismiss={toggleDatePicker} dismissable style={{ marginHorizontal: 20 }}>
                    <DateTimePicker
                        timePicker
                        showOutsideDays
                        mode="single"
                        date={newDate}
                        minDate={today.setHours(12, 0, 0)}
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
                        <Button mode="contained" onPress={toggleDatePicker}>
                            <CircleCheck color={colors.onPrimary} size={20} />
                        </Button>
                    }
                </Modal>
            </Portal>
        </>
    )
}