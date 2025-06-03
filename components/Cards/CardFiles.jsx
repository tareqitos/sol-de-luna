import { Appearance, Image, StyleSheet, View } from "react-native";
import Txt from "../Utils/Txt";
import { Chip, Icon, useTheme } from "react-native-paper";
import { themeHook } from "../../hook/theme";

export default function CardFiles({ file }) {
    const { colors } = useTheme()
    const { theme } = themeHook();
    const systemTheme = Appearance.getColorScheme();


    function File() {
        const extension = file.uri.split('.').pop().toLowerCase();

        const renderExtension = (ext) => {
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                    return 'image';
                case 'pdf':
                    return 'file-pdf-box';
                case 'json':
                    return 'code-json';
                case 'doc':
                case 'docx':
                    return 'file-word-box';
                case 'xls':
                case 'xlsx':
                    return 'file-excel-box';
                default:
                    return 'file-document-outline';
            }
        }

        const chipIcon = () => (
            <Icon source={renderExtension(extension)} color={colors.primary} size={18} />
        )

        const textStyle = {
            color: colors.onBackground,
        };

        return (
            <>
                <Chip
                    icon={chipIcon}
                    mode={theme === "dark" ? "outlined" : systemTheme === "dark" ? "outlined" : "flat"}
                    textStyle={textStyle}
                    style={[styles.file, { borderColor: colors.primary }]}
                >
                    {`${file.name.substr(0, 30)}...${extension}`}
                </Chip>
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
        width: "auto",
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