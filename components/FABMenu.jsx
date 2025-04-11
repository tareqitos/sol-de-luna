import { useState } from "react";
import { DefaultTheme, FAB, MD3Colors, PaperProvider, Portal, useTheme } from "react-native-paper";
import { themeHook } from "../hook/theme";
import { useNavigation } from "@react-navigation/native";

export default function FABMenu({ style }) {
    const [open, setOpen] = useState(false);
    const nav = useNavigation()
    const { colors } = useTheme();

    return (
        <FAB.Group
            open={open}
            visible
            icon='plus'
            color={colors.onPrimary}
            style={[style]}
            fabStyle={{ backgroundColor: colors.primary }}
            backdropColor="none"
            variant="primary"
            actions={[
                {
                    icon: 'airplane',
                    onPress: () => nav.navigate('AddFlight'),
                    color: colors.onPrimary,
                    style: { backgroundColor: colors.primary }
                },
                {
                    icon: 'home-city',
                    onPress: () => nav.navigate('AddHotel'),
                    color: colors.onPrimary,
                    style: { backgroundColor: colors.primary }
                },
                {
                    icon: 'train-car',
                    onPress: () => nav.navigate('AddTransport'),
                    color: colors.onPrimary,
                    style: { backgroundColor: colors.primary }
                }
            ]}
            onStateChange={({ open }) => setOpen(open)}
        />
    )
}