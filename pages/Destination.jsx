import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Title from "../components/Title";
import { s } from "../styles/styles.style";
import { IconButton, Surface, TextInput, useTheme } from "react-native-paper";
import Container from "../components/Container";
import Txt from "../components/Txt";
import OverviewCard from "../components/OverviewCard";
import { useEffect, useRef, useState } from "react";
import DialogPopUp from "../components/Dialog";
import { useData } from "../hook/data";
import { useNavigation } from "@react-navigation/native";
import { set } from "react-hook-form";

export default function Destination() {
    const { colors, typography } = useTheme();
    const { destinations, addDestination, deleteDestination } = useData();

    const [value, setValue] = useState()
    const [dialogVisible, setDialogVisible] = useState(false)
    const [isDelete, setDelete] = useState(false);
    const nav = useNavigation();
    const [selectedDestinationId, setSelectedDestinationId] = useState();

    const dialogContent = (
        <TextInput
            label=""
            mode="flat"
            focusable
            maxLength={20}
            style={{ backgroundColor: "none" }}
            value={value}
            onChangeText={setValue}
        />
    )

    const deleteDialogContent = (
        <Txt>Are you sure you want to delete this destination and all its data?</Txt>
    )

    const handleAddDestination = (dest) => {
        if (value.length > 0) {
            addDestination(dest)
            setDialogVisible(false)
            setValue("")
            console.log(destinations)
        } else {
            console.log("Value is empty")
        }
    }

    const handleDeleteDestination = (destID) => {
        setSelectedDestinationId(destID)
        setDelete(true)
        setDialogVisible(true)
    }

    const deleteCancel = () => {
        setDialogVisible(false);
        setDelete(false)
    }

    return (
        <Container>
            <View>
                <View style={s.home.title} >
                    <Title title={"Destination"} subtitle={""} textColor={colors.onBackground} />
                </View>
            </View>


            <ScrollView style={[styles.container, { gap: 10 }]}>
                {destinations.length > 0 && destinations.map((destination) => (
                    <TouchableOpacity
                        key={destination.id}
                        activeOpacity={1}
                        onPress={() => nav.navigate('Home', { destination })}
                        onLongPress={() => handleDeleteDestination(destination.id)}
                        style={{ flex: 1 }} >
                        <Surface style={[typography.body, styles.destination, { backgroundColor: colors.surface }]} elevation={1}>
                            <Txt style={typography.h2}>{destination.name}</Txt>
                        </Surface>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {dialogVisible && !isDelete &&
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                    title="Where are you going?"
                    content={dialogContent}
                    cancel={() => setDialogVisible(false)}
                    validate={() => handleAddDestination(value)}
                    validateText="Confirm"
                />
            }

            {dialogVisible && isDelete &&
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={deleteCancel}
                    title="Delete Destination"
                    content={deleteDialogContent}
                    cancel={deleteCancel}
                    validate={() => {
                        deleteDestination(selectedDestinationId)
                        deleteCancel()
                    }}
                    validateText="Confirm"
                />
            }

            <View style={{ position: "absolute", bottom: 40, right: 40 }}>
                <IconButton icon={"plus"} size={25} mode="contained" onPress={() => setDialogVisible(true)} style={{ width: 60, height: 60 }} iconColor={colors.onPrimary} containerColor={colors.primary} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 2
    },

    destination: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        marginVertical: 10
    }
})