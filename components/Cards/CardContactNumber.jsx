import { Chip, useTheme } from "react-native-paper"
import Txt from "../Utils/Txt"
import { copyToClipboard, openPhoneDialer } from "../../services/services";

export const CardContactNumber = ({ contactNumber }) => {
    const { colors, typography } = useTheme();

    return (
        <>
            <Chip icon="phone" onPress={() => { openPhoneDialer(contactNumber) }} compact style={{ borderRadius: 5, color: colors.onSurface, backgroundColor: colors.surface, }} >
                <Txt style={[typography.bodyInter, { fontSize: 16 }]}>
                    {contactNumber}
                </Txt>
            </Chip>
        </>
    )
}