import { Button, List, Modal, Portal, useTheme } from "react-native-paper"
import Txt from "./Utils/Txt"
import { ScrollView, StyleSheet } from "react-native"
import { checkAppVersion, updates } from "../services/services"
import { useState } from "react"

export const UpdateModal = () => {
    const [visible, setVisible] = useState(checkAppVersion())
    const { colors, typography } = useTheme()

    const closeModal = () => {
        setVisible(false);
    }


    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={closeModal}
                style={styles.modal}
                contentContainerStyle={[styles.modalContent, { backgroundColor: colors.surface }]}
            >
                <ScrollView style={{}}>

                    <List.Section>
                        <List.Subheader style={[typography.h2, { color: colors.onSurface }]} >
                            🌟 Updates
                        </List.Subheader>

                        {updates.map((update, index) => (
                            <List.Item
                                key={index}
                                title={update.version}
                                description={() => (
                                    <>
                                        <Txt style={typography.bodyInter}>{update.date}</Txt>
                                        <Txt style={typography.body}>{update.description}</Txt>
                                        <Txt style={typography.body}>{update.message}</Txt>
                                    </>
                                )}
                                style={{ marginVertical: 0 }}
                                titleStyle={typography.h3}
                                descriptionStyle={{ color: colors.onSurfaceVariant }}
                            />
                        ))}
                    </List.Section>
                </ScrollView>
                <Button onPress={closeModal}>Close</Button>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        justifyContent: "flex-start",
        borderRadius: 10,
        padding: 10,
        maxHeight: '80%',
        width: '80%',
    }
})