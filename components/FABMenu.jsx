import { useState } from "react";
import { FAB, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function FABMenu({ destination, tab, style }) {
    const [open, setOpen] = useState(false);
    const nav = useNavigation()
    const { colors } = useTheme();

    const items = [
        { type: "flights", icon: "airplane", path: "AddFlight" },
        { type: "hotels", icon: "home-city", path: "AddHotel" },
        { type: "transport", icon: "train-car", path: "AddTransport" },
    ]

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
            actions={icon == "plus" ?
                items.map(item => ({
                    icon: item.icon,
                    onPress: () => nav.navigate(item.path, { destination }),
                    color: colors.onPrimary,
                    style: { backgroundColor: colors.primary }
                })) : []}
            onPress={() => {
                items.map(item => (
                    tab == item.type ? nav.navigate(item.path, { destination }) : null
                ))
            }
            }
            onStateChange={({ open }) => setOpen(tab == "home" && open)}
        />
    )
}