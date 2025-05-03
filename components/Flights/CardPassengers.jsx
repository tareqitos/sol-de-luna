
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Surface, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { generateRandomEmoji } from "../../services/services";
import { useData } from "../../hook/data";

export default function CardPassengers({ destination, item, passengers }) {

    const { colors, typography } = useTheme()
    const { updateItem } = useData();

    const updateEmoji = (id) => {
        const passengerToUpdate = passengers.find((passenger) => passenger.id === id);
        passengerToUpdate.emoji = generateRandomEmoji();
        const updatedItem = { ...item, passengers: [...item.passengers.map(passenger => passenger.id === id ? passengerToUpdate : passenger)] }
        updateItem(destination.id, updatedItem)
    }

    return (
        <View style={{ gap: 10 }}>
            {passengers && passengers.map((passenger) => (
                <Surface style={[s.surface, { backgroundColor: colors.surface }]} elevation={1} key={passenger.id}>
                    <TouchableOpacity activeOpacity={.8} onPress={() => updateEmoji(passenger.id)}>
                        <Avatar.Text label={passenger.emoji} size={36} />
                    </TouchableOpacity>
                    {passenger.name && <Txt style={[typography.h5, { flex: 1 }]}>{passenger.name}</Txt>}
                    {passenger.seat && <Txt style={[typography.caption]}>{passenger.seat}</Txt>}
                </Surface>
            ))}
        </View>
    )
}


const s = StyleSheet.create({
    surface: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 10,

        marginHorizontal: 2,

        paddingHorizontal: 15,
        paddingLeft: 5,
        paddingVertical: 5,
        borderRadius: 50
    },
})