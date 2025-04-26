import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";
import { View } from "react-native";

export default function DialogPopUp({ visible, onDismiss, title, content, cancel, validate, validateText }) {
    const { colors } = useTheme();
    return (
        <View>
            <Portal>
                <Dialog style={{ backgroundColor: colors.surface }} visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content>
                        {content}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={cancel}>Cancel</Button>
                        <Button onPress={validate}>{validateText}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}