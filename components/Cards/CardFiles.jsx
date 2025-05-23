import { Image, StyleSheet, View } from "react-native";
import Txt from "../Utils/Txt";
import { Icon, useTheme } from "react-native-paper";

export default function CardFiles({ file }) {
    const { colors } = useTheme()

    function File() {
        const extension = file.uri.split('.').pop().toLowerCase();

        return (
            <>
                {
                    ['jpg', 'jpeg', 'png'].includes(extension) ?
                        <View style={[styles.file]}>
                            <Image
                                source={{ uri: file.uri }}
                                style={styles.image}
                                resizeMode="cover"
                                fadeDuration={300}
                                progressiveRenderingEnabled={true}
                            />
                        </View> :

                        <View style={[styles.document, { backgroundColor: colors.secondary }]}>
                            <Icon source="file-document-outline" color={colors.onSecondary} size={48} />
                            <Txt style={{ fontSize: 12, color: colors.onSecondary }}>{`${file.name.substr(0, 5)}...${extension}`}</Txt>
                        </View>
                }
            </>
        )
    }

    return (

        <File />

    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },

    file: {
        justifyContent: "space-around",
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: "grey",
        overflow: "hidden"
    },

    document: {
        justifyContent: "space-around",
        alignItems: "center",
        width: 100,
        height: 100,
        borderRadius: 5,
        overflow: "hidden"
    }
})