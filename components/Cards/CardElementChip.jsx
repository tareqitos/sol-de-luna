import { Chip, useTheme } from "react-native-paper"
import Txt from "../Utils/Txt"

export const CardElementChip = ({ icon, onPress, element, clickable }) => {
    const { colors, typography } = useTheme();

    return (
        <>
            <Chip icon={icon} onPress={onPress} textStyle={[typography.bodyInter, { color: clickable ? colors.primary : colors.onSurface, fontWeight: "700", fontSize: 14 }]} style={{ borderRadius: 5, color: colors.onSurface, backgroundColor: colors.surface, }} >
                {element}
            </Chip>
        </>
    )
}