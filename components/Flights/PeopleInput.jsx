import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, IconButton, Surface, TextInput, useTheme } from "react-native-paper";
import { v4 as uuidv4 } from 'uuid';
import Txt from "../Utils/Txt";
import { generateRandomEmoji } from "../../services/services";

export default function PeopleInput({ passengerLabel, seatLabel, passengers, setPassengers }) {

    const [emoji, setEmoji] = useState("")
    const [name, setName] = useState("")
    const [seat, setSeat] = useState("")
    const { colors, typography } = useTheme()

    const updateEmoji = async (id) => {
        setEmoji(generateRandomEmoji())
        setPassengers(passengers.map(person =>
            person.id === id ? { ...person, emoji } : person
        ));
    }

    const addPassenger = () => {
        if (name.length === 0) return console.log("No name provided")
        setEmoji(generateRandomEmoji())
        setPassengers([...passengers, { id: uuidv4().split("-")[0], name, seat, emoji }]);
        setName("");
        setSeat("");
    }

    useEffect(() => {
        setEmoji(generateRandomEmoji())
    }, [])

    const removePassenger = (id) => {
        setPassengers((prev) => prev.filter((passenger) => passenger.id !== id))
    }

    function ShowPassengers() {
        return (
            <View style={{ gap: 10 }}>
                {passengers && passengers.map((passenger, index) => (
                    <Surface style={[s.surface, { backgroundColor: colors.surface }]} elevation={1} key={index}>
                        <TouchableOpacity activeOpacity={.8} onPress={() => updateEmoji(passenger.id)}>
                            <Avatar.Text color='black' label={passenger.emoji} size={36} />
                        </TouchableOpacity>
                        {passenger.name && <Txt style={[typography.h5, { flex: 1 }]}>{passenger.name}</Txt>}
                        {passenger.seat && <Txt style={[typography.caption, { flex: 1 }]}>{passenger.seat}</Txt>}
                        <IconButton icon="minus-box" mode="contained" containerColor="none" size={20} onPress={() => removePassenger(passenger.id)} />
                    </Surface>
                ))}
            </View>
        )
    }

    return (

        <>
            <View style={[s.inputContainer]}>
                <View style={[s.itemContainer, { flex: 1 }]}>
                    <TextInput
                        label={passengerLabel}
                        mode
                        value={name}
                        onChangeText={setName}
                        style={[typography.body, { flex: 1, paddingHorizontal: 0, backgroundColor: colors.background }]}
                        autoCorrect={false}
                        right={<TextInput.Icon icon="account" style={{ alignSelf: "baseline" }} size={18} />}

                    />
                </View>

                <View style={[s.itemContainer, { width: 80 }]}>
                    <TextInput
                        label={seatLabel}
                        value={seat}
                        onChangeText={setSeat}
                        style={[typography.body, { paddingHorizontal: 0, backgroundColor: colors.background }]}
                        maxLength={4}
                        autoCorrect={false}
                        right={<TextInput.Icon icon="car-seat" style={{ alignSelf: "baseline" }} size={18} />}
                    />
                </View>
                <IconButton icon="plus-circle" mode="contained" iconColor={colors.primary} size={30} onPress={addPassenger} style={{ backgroundColor: colors.background }} />
            </View>
            <ShowPassengers />
        </>
    )
}

const s = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        paddingVertical: 5,
        gap: 10
    },

    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    surface: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginHorizontal: 20,
        borderRadius: 50
    },

})