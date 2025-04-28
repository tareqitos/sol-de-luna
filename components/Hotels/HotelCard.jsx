import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"

import Collapsible from "react-native-collapsible"
import { useCallback, useState } from "react"
import CollapseButton from "../UI/CollapseButton"
import { s } from "../../styles/card.style"

import { Divider, MD3DarkTheme, useTheme } from "react-native-paper"
import CardTitle from "../Cards/CardTitle"
import CardFiles from "../Cards/CardFiles"
import CardInformation from "../Cards/CardInformation"
import CardAddFiles from "../Cards/CardAddFiles"
import CardSection from "../Cards/CardSection"
import CardStars from "./CardStars"
import CardTime from "../Cards/CardTime"
import CardDate from "../Cards/CardDate"
import { MoveRight } from "lucide-react-native"
import CardAddress from "./CardAddress"
import { useDocument } from "../../hook/document"
import DialogPopUp from "../UI/Dialog"
import Txt from "../Utils/Txt"

export default function HotelCard({ item, onPress, destination }) {
    const [isCollapsed, setIsCollapse] = useState(true) // CHANGE TO TRUE FOR PROD
    const { colors, elevation } = useTheme()
    const { openDocument, deleteDocument } = useDocument();

    const [dialogVisible, setDialogVisible] = useState(false);
    const [fileToDelete, setFileToDelete] = useState(null);

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);


    const handleDeleteFile = (file) => {
        setFileToDelete(file);
        setDialogVisible(true);
    };

    const confirmDelete = () => {
        deleteDocument(destination.id, item, fileToDelete);
        closeDialog();
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setFileToDelete(null);
    };

    return (
        <View style={[s.card.container, elevation.level1, { backgroundColor: colors.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            {/* TITLE */}
            <View style={s.card.title_container}>
                <CardTitle title={item.name} />
            </View>

            {/* STARS */}
            <CardSection style={{ flexDirection: "row" }}>
                <CardStars stars={item.stars} />
            </CardSection>

            <Divider theme={MD3DarkTheme} />

            {/* CHECK DATE */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CardDate date={item.checkIn} />
                <MoveRight color={colors.primary} size={18} />
                <CardDate date={item.checkOut} hasIcon={false} />
            </CardSection>

            {/* CHECK TIME */}
            <CardSection style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <CardTime time={item.checkIn} />
                <MoveRight color={colors.primary} size={18} />
                <CardTime time={item.checkOut} hasIcon={false} />
            </CardSection>


            <Collapsible collapsed={isCollapsed} duration={300} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>
                    {/* ADDRESS */}
                    <CardSection style={styles.cardSection} text="Address">
                        <CardAddress item={item} />
                    </CardSection>

                    {/* ADDITIONAL INFORMATION */}
                    <CardSection style={styles.cardSection} text={"Additional information"}>
                        <CardInformation item={item} destinationID={destination.id} onPress={onPress} placeholder="Reservation number, instructions, amenities, etc." />
                    </CardSection>

                    {item.documents.length > 0 &&
                        <CardSection style={styles.cardSection} >
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {/* ADDED FILES */}
                                <View style={styles.container}>
                                    {item.documents.map((file) => (
                                        <TouchableOpacity
                                            key={file.uri}
                                            activeOpacity={0.9}
                                            onPress={() => openDocument(file.uri)}
                                            onLongPress={() => Platform.OS === "android" ? handleDeleteFile(file.name) : deleteDocument(destination.id, item, file.name)}
                                        >
                                            <CardFiles file={file} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </CardSection>}
                </View>

                {/* ADD FILE BUTTON */}
                <CardAddFiles item={item} destinationID={destination.id} />
            </Collapsible >
            <DialogPopUp
                visible={dialogVisible}
                onDismiss={closeDialog}
                title="Delete File"
                content={<Txt>Are you sure you want to delete this file?</Txt>}
                cancel={closeDialog}
                validate={confirmDelete}
                validateText="Confirm"
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    cardSection: {
        marginVertical: 10,
        gap: 10
    }
})