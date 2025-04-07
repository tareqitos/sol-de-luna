import { StyleSheet } from "react-native";
import { MD3Colors, PaperProvider, Portal, Snackbar, useTheme } from "react-native-paper";
import { useSnackbar } from "../hook/useSnackbar";

export default function SnackbarMessage() {
    const { colors } = useTheme();
    const { message, visible, dismissBar } = useSnackbar();

    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={dismissBar}
                duration={5000}
                action={{
                    label: 'Yay'
                }}
                elevation={1}
                style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.primary }]}
            >

                {message}

            </Snackbar>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center", height: 60, bottom: 50,
        borderWidth: 1
    },
});