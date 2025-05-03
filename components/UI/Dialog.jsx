import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { View } from "react-native";
import { DIALOGS } from "../../locales/languagesConst";
import { useTranslation } from "react-i18next";

export default function DialogPopUp({ visible, onDismiss, title, content, cancel, validate, validateText }) {
    const { colors } = useTheme();
    const { t } = useTranslation()
    return (
        <View>
            <Portal>
                <Dialog style={{ backgroundColor: colors.surface }} visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Content>
                        {content}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={cancel}>{t(DIALOGS.CANCEL)}</Button>
                        <Button onPress={validate}>{t(DIALOGS.CONFIRM)}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}