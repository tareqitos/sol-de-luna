import { StyleSheet } from "react-native";
import { Portal, Snackbar, useTheme } from "react-native-paper";
import { useSnackbar } from "../../hook/useSnackbar";

export default function SnackbarMessage() {
    const { colors } = useTheme();
    const { message, visible, dismissBar } = useSnackbar();
    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={dismissBar}
                duration={3000}
                action={{

                    icon: "thumb-up",
                    onPress: () => { dismissBar },
                    textColor: colors.accent // Change the color of the action label here
                }}
                elevation={2}
                theme={{ color: colors.primary }}
                style={[styles.container, { color: colors.primary, backgroundColor: colors.surface, borderColor: colors.primary }]}
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
        alignItems: "center", height: "auto", bottom: 50,
        borderRadius: 10,
        borderWidth: 1
    },
});