import { Keyboard, Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Title from "../components/Utils/Title";
import { Button, Surface, TextInput, useTheme } from "react-native-paper";
import Container from "../components/Utils/Container";
import Txt from "../components/Utils/Txt";
import { useMemo, useState } from "react";
import DialogPopUp from "../components/UI/Dialog";
import { useData } from "../hook/data";
import { useNavigation } from "@react-navigation/native";
import { generateDestinationEmoji } from "../services/services";
import { useTranslation } from "react-i18next";
import I from "../locales/languagesConst";

export default function Destination() {
    const nav = useNavigation();

    const { colors, typography } = useTheme();
    const { destinations, addDestination, deleteDestination } = useData();

    const [value, setValue] = useState()
    const [dialogVisible, setDialogVisible] = useState(false)
    const [isDelete, setDelete] = useState(false);

    const [emoji, setEmoji] = useState(generateDestinationEmoji());
    const [selectedDestinationId, setSelectedDestinationId] = useState();

    const { t } = useTranslation();

    const greetingsArr = t("greetings", { returnObjects: true });
    const questionsArr = t("travelQuestions", { returnObjects: true });

    const randomGreeting = useMemo(() => greetingsArr[Math.floor(Math.random() * greetingsArr.length)], [t]);
    const randomQuestion = useMemo(() => questionsArr[Math.floor(Math.random() * questionsArr.length)], [t]);


    const deleteDialogContent = (
        <Txt>Are you sure you want to delete this destination and all its data?</Txt>
    )

    const handleAddDestination = (dest) => {
        if (value.length > 0 && emoji) {
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

    const updateEmoji = () => {
        setEmoji(generateDestinationEmoji())
    }

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };
    // const triggerNotification = () => {
    //     scheduleDepartureReminder(5);
    // }

    return (
        <Container>
            <View>
                <View>
                    <Title title={"Destination"} subtitle={""} textColor={colors.onBackground} />
                </View>
            </View>



            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={styles.wrapper}>

                    <View style={styles.container}>
                        <Txt style={[typography.body, styles.greetings]}>
                            {t(randomGreeting)},
                        </Txt>
                        <Txt style={[typography.body, styles.greetings]}>
                            {randomQuestion}
                        </Txt>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={updateEmoji} style={{ zIndex: 2 }} hitSlop={{ top: 10, bottom: 10, right: 10 }}>
                                <Txt style={{ fontSize: 24 }}>
                                    {emoji}
                                </Txt>
                            </TouchableOpacity>
                            <TextInput
                                mode="flat"
                                value={value}
                                onChangeText={setValue}
                                placeholder={t(I.PLACEHOLDER)}
                                style={{ flex: 1, backgroundColor: colors.background }}
                                right={<TextInput.Icon icon="plus" size={24} onPress={() => { handleAddDestination(`${emoji} ${value}`) }} />}
                            />
                        </View>
                    </View>
                    <View style={styles.destinations}>
                        {destinations.length > 0 && destinations.map((destination) => (
                            <TouchableOpacity
                                key={destination.id}
                                activeOpacity={1}
                                onPress={() => nav.navigate('Home', { destination })}
                                onLongPress={() => Platform.OS === "android" ? handleDeleteDestination(destination.id) : deleteDestination(destination.id)}
                            >
                                <Surface style={[styles.item, { backgroundColor: colors.surface }]} elevation={1}>
                                    <Txt style={typography.h5}>{destination && destination.name}</Txt>
                                </Surface>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {
                dialogVisible && isDelete &&
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
        </Container >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: .7,
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    destinations: {
        marginVertical: 20,
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap"
    },

    item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },

    greetings: {
        fontSize: 32
    }
})