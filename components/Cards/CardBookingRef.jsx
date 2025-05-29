import { Chip, useTheme } from "react-native-paper"
import Txt from "../Utils/Txt"
import * as Clipboard from 'expo-clipboard';

export const CardBookingRef = ({ bookingRef }) => {
    const { colors, typography } = useTheme();

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(bookingRef);
    };

    return (
        <>
            <Chip mode="outlined" onPress={copyToClipboard} compact style={{ borderWidth: 1, borderRadius: 5, backgroundColor: colors.background }} >
                <Txt style={[typography.bodyInter, { fontSize: 16 }]}>
                    {bookingRef}
                </Txt>
            </Chip>
        </>
    )
}