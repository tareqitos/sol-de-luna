import { Modal, Portal, useTheme } from "react-native-paper";

export default function ModalCard({ visible, onDismiss, children }) {
    const { colors } = useTheme()

    const modalStyle = { justifyContent: "center", alignItems: "center" }
    const containerStyle = { backgroundColor: colors.surface, borderRadius: 10, paddingVertical: 20, minWidth: 200 };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                style={modalStyle}
                contentContainerStyle={containerStyle}
            >
                {children}
            </Modal>
        </Portal>
    )
}

