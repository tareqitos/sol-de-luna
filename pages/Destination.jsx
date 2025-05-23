import { Animated, Keyboard, Platform, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from "react-native";
import Title from "../components/Utils/Title";
import { Button, Chip, Surface, TextInput, useTheme } from "react-native-paper";
import Container from "../components/Utils/Container";
import Txt from "../components/Utils/Txt";
import { useMemo, useState } from "react";
import DialogPopUp from "../components/UI/Dialog";
import { useData } from "../hook/data";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { DESTINATION, DIALOGS } from "../locales/languagesConst";
import { getScaleValue, handlePressIn, handlePressOut } from "../services/animation-service";
import DestinationInput from "../components/Destination/DestinationInput";
import ModalCard from "../components/UI/Modal";

export default function Destination() {
    const nav = useNavigation();

    const { t } = useTranslation();
    const { colors, typography } = useTheme();
    const { destinations, addDestination, deleteDestination, renameDestination } = useData();

    const [value, setValue] = useState()
    const [dialogVisible, setDialogVisible] = useState(false)
    const [isDelete, setDelete] = useState(false);
    const [selectedDestinationId, setSelectedDestinationId] = useState();

    const [isRename, setIsRename] = useState(false)
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const deleteCard = (id) => {
        hideModal()
        Platform.OS === "android" ? handleDeleteDestination(id) : deleteDestination(id)
    }


    const deleteDialogContent = <Txt>{t(DESTINATION.DIALOG_CONTENT)}</Txt>
    const renameDialogContent = (
        <TextInput
            mode="flat"
            value={value}
            onChangeText={setValue}
            placeholder={t(DESTINATION.RENAME_CONTENT)}
            focusable
            maxLength={30}
            textColor={colors.onBackground}
            style={{ backgroundColor: colors.surface }}
        />
    )

    const handleDeleteDestination = (destID) => {
        Vibration.vibrate(20)
        setSelectedDestinationId(destID)
        setDelete(true)
        setDialogVisible(true)
    }

    const handleCancel = () => {
        setDialogVisible(false);
        setDelete(false)
        setIsRename(false)
    }

    const setDestinationNewName = (id) => {
        const isValid = renameDestination(id, value)
        if (isValid === false) {
            return console.log("not valid")
        } else {
            renameDestination(id, value)
            setValue("")
            handleCancel()
        }
    }

    const showRenameModal = (id) => {
        setSelectedDestinationId(id)
        setDialogVisible(true)
        setIsRename(true)
    }

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    const DestinationList = useMemo(() => {
        return (
            <View style={styles.destinations}>
                {destinations.length > 0 && destinations.map((destination) => {
                    const scaleValue = getScaleValue(destination.id);

                    return (
                        <Animated.View
                            key={destination.id}
                            style={{ transform: [{ scale: scaleValue }] }} // Apply scale transformation
                        >
                            <TouchableOpacity
                                key={destination.id}
                                activeOpacity={1}
                                onPressIn={() => handlePressIn(0.95, destination.id)}
                                onPressOut={() => handlePressOut(destination.id)}
                                onPress={() => nav.navigate('Home', { destination })}
                                onLongPress={showModal}
                            >

                                <Surface style={[styles.item, { backgroundColor: colors.surface }]} elevation={1}>
                                    <Txt style={typography.h3}>{destination && destination.name}</Txt>
                                    <View style={styles.chips}>
                                        <Chip icon="airplane" mode="outlined">{destination.flights.length}</Chip>
                                        <Chip icon="home-city" mode="outlined">{destination.hotels.length}</Chip>
                                        <Chip icon="car" mode="outlined">{destination.transport.length}</Chip>
                                    </View>
                                </Surface>
                            </TouchableOpacity>

                            <ModalCard visible={visible} onDismiss={hideModal} >
                                <Button onPressIn={hideModal} onPress={() => showRenameModal(destination.id)}>{t(DIALOGS.RENAME)}</Button>
                                <Button onPress={() => deleteCard(destination.id)}>{t(DIALOGS.DELETE)}</Button>
                            </ModalCard>

                        </Animated.View>
                    )
                })}
            </View>
        )
    }, [destinations, value, showModal])

    return (
        <Container>
            <View>
                <View>
                    <Title title={t(DESTINATION.TITLE)} subtitle={""} textColor={colors.onBackground} />
                </View>
            </View>
            <View style={{ flex: .2 }}></View>
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={styles.wrapper}>
                    <DestinationInput
                        value={value}
                        setValue={setValue}
                        addDestination={addDestination}
                        colors={colors}
                        typography={typography}
                        t={t}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {DestinationList}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>


            {
                dialogVisible && isDelete &&
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={handleCancel}
                    title={t(DESTINATION.DIALOG_TITLE)}
                    content={deleteDialogContent}
                    cancel={handleCancel}
                    validate={() => {
                        deleteDestination(selectedDestinationId)
                        handleCancel()
                    }}
                />
            }

            {
                dialogVisible && isRename &&
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={handleCancel}
                    title={t(DESTINATION.RENAME_TITLE)}
                    content={renameDialogContent}
                    cancel={handleCancel}
                    validate={() => setDestinationNewName(selectedDestinationId, value)}
                />
            }
        </Container >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20,
    },

    destinations: {
        marginVertical: 20,
        marginBottom: 40,
        paddingHorizontal: 5,
        gap: 10,
        flex: 1
    },

    item: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        // flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",

        gap: 10,
        flex: 1
    },

    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },

    greetings: {
        fontSize: 32
    }
})