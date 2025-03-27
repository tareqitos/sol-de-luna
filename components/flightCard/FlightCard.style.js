import { Raleway_500Medium } from "@expo-google-fonts/raleway";
import { StyleSheet } from "react-native";

const backgroundColorHex = "#f7fdf4";
const lightGreen = "#b0c29f"
const normalGreen = "#90a97b";
const darkGreen = "#647457"

const s = StyleSheet.create({
    container: {
        padding: 20,
        gap: 5,
        backgroundColor: backgroundColorHex,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    icons_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    plane_icon_container: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: "white"
    },

    title_container: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5
    },
    title: {
        color: "black",
        fontSize: 18,
        fontFamily: "Raleway-600"
    },
    date: {
        color: "black",
        fontFamily: "Inter-400"
    },

    destination_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    iata: {
        fontSize: 18,
        color: "black"
    },

    // ADDITIONAL INFO

    add_container: {
        marginTop: 20
    },

    add_title: {
        color: "black",
        fontSize: 16,
        fontFamily: "Raleway-600"
    },

    add_infos: {
        color: "black"
    },

    upload: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,

        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: lightGreen,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    }

});

export { s }