import { Chip, useTheme } from "react-native-paper"
import Txt from "../Utils/Txt"
import * as Clipboard from 'expo-clipboard';
import { copyToClipboard } from "../../services/services";

export const CardBookingRef = ({ bookingRef }) => {
    const { colors, typography } = useTheme();

    return (
        <>
            <Chip icon="checkbook" onPress={() => copyToClipboard(bookingRef)} compact style={{ borderRadius: 5, color: colors.onSurface, backgroundColor: colors.surface, }} >
                <Txt style={[typography.bodyInter, { fontSize: 16 }]}>
                    {bookingRef}
                </Txt>
            </Chip>
        </>
    )
}