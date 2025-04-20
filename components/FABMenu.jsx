import { useState } from "react";
import { FAB, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function FABMenu({ tab, style }) {
    const [open, setOpen] = useState(false);
    const nav = useNavigation()
    const { colors } = useTheme();

    const adaptIconTab = () => {
        switch (tab) {

            case "flights":
                return "airplane";
            case "hotels":
                return "home-city";
            case "transport":
                return "train-car";
            default:
                return "plus";
        }
    };

    const icon = adaptIconTab();

    return (
        <FAB.Group
            open={open}
            visible
            icon={icon}
            color={colors.onPrimary}
            style={[style]}
            fabStyle={{ backgroundColor: colors.primary }}
            backdropColor="none"
            variant="primary"
            actions={icon == "plus" ? [
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
            ] : []}
            onPress={
                tab == "flights" ? () => nav.navigate('AddFlight') :
                    tab == "hotels" ? () => nav.navigate('AddHotel') :
                        tab == "transport" ? () => nav.navigate('AddTransport') :
                            null
            }
            onStateChange={({ open }) => setOpen(tab == "home" && open)}
        />
    )
}