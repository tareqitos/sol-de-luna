import {
    Animated,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Vibration,
    View
} from "react-native";
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

    const [value, setValue] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [isRename, setIsRename] = useState(false);

    const [selectedDestinationId, setSelectedDestinationId] = useState(null);
    const [visible, setVisible] = useState(false);

    const showModal = (id) => {
        setSelectedDestinationId(id);
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    const deleteCard = (id) => {
        hideModal();
        if (Platform.OS === "android") {
            handleDeleteDestination(id);
        } else {
            deleteDestination(id);
        }
    };

    const handleAddDestination = async (emoji, dest) => {
        if (!dest?.length) {
            console.log("Value is empty");
            return;
        }
        const newDestination = await addDestination(`${emoji} ${dest}`);
        setValue("");
        nav.navigate("Home", { destination: newDestination });
    };

    const handleDeleteDestination = (destID) => {
        Vibration.vibrate(20);
        setSelectedDestinationId(destID);
        setDelete(true);
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
        setDelete(false);
        setIsRename(false);
    };

    const setDestinationNewName = (id) => {
        const isValid = renameDestination(id, value);
        if (!isValid) {
            console.log("not valid");
            return;
        }
        setValue("");
        handleCancel();
    };

    const showRenameModal = (id) => {
        setSelectedDestinationId(id);
        setDialogVisible(true);
        setIsRename(true);
    };

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    const DestinationList = useMemo(
        () => (
            <View style={styles.destinations}>
                {destinations.map((destination) => {
                    const scaleValue = getScaleValue(destination.id);
                    return (
                        <Animated.View
                            key={destination.id}
                            style={{ transform: [{ scale: scaleValue }] }}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={() => handlePressIn(0.95, destination.id)}
                                onPressOut={() => handlePressOut(destination.id)}
                                onPress={() => nav.navigate("Home", { destination })}
                                onLongPress={() => showModal(destination.id)}
                            >
                                <Surface
                                    style={[styles.item, { backgroundColor: colors.surface }]}
                                    elevation={1}
                                >
                                    <Txt style={typography.h3}>{destination.name}</Txt>
                                    <View style={styles.chips}>
                                        <Chip icon="airplane" mode="outlined">
                                            {destination.flights.length}
                                        </Chip>
                                        <Chip icon="home-city" mode="outlined">
                                            {destination.hotels.length}
                                        </Chip>
                                        <Chip icon="car" mode="outlined">
                                            {destination.transport.length}
                                        </Chip>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        ),
        [destinations, colors.surface, typography.h3]
    );

    const deleteDialogContent = <Txt>{t(DESTINATION.DIALOG_CONTENT)}</Txt>;
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
    );

    return (
        <Container>
            <Title
                title={t(DESTINATION.TITLE)}
                subtitle=""
                textColor={colors.onBackground}
            />
            <View style={{ flex: 0.2 }} />
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                <View style={styles.wrapper}>
                    <DestinationInput
                        value={value}
                        setValue={setValue}
                        handleAddDestination={handleAddDestination}
                        colors={colors}
                        typography={typography}
                        t={t}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {DestinationList}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>

            <ModalCard visible={visible} onDismiss={hideModal}>
                <Button
                    onPress={() => {
                        hideModal();
                        showRenameModal(selectedDestinationId);
                    }}
                >
                    {t(DIALOGS.RENAME)}
                </Button>
                <Button onPress={() => deleteCard(selectedDestinationId)}>
                    {t(DIALOGS.DELETE)}
                </Button>
            </ModalCard>

            {dialogVisible && isDelete && (
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={handleCancel}
                    title={t(DESTINATION.DIALOG_TITLE)}
                    content={deleteDialogContent}
                    cancel={handleCancel}
                    validate={() => {
                        deleteDestination(selectedDestinationId);
                        handleCancel();
                    }}
                />
            )}
            {dialogVisible && isRename && (
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={handleCancel}
                    title={t(DESTINATION.RENAME_TITLE)}
                    content={renameDialogContent}
                    cancel={handleCancel}
                    validate={() => setDestinationNewName(selectedDestinationId)}
                />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20
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
        justifyContent: "space-between",
        gap: 10
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5
    }
});