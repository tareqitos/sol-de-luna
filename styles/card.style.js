import { MoveRight } from "lucide-react-native";
import { StyleSheet } from "react-native";


const s = StyleSheet.create({
    card_container: {
        container: {
            paddingHorizontal: 10,
            paddingVertical: 20,
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

        collapsible: {
            paddingHorizontal: 10,
            paddingBottom: 20,
            marginTop: 20,
            gap: 15
        },

        title_container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },

        title: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10
        },

        add_item: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: 2,
            borderRadius: 50,
        }
    },
    card: {
        container: {
            padding: 20,
            gap: 5,
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
            position: "absolute",
            right: 10,
            top: 10,
            alignItems: "center"
        },

        plane_icon_container: {
            padding: 5,
            borderRadius: 5,
        },

        title_container: {
            flexDirection: "row",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 5
        },

        title: {
            fontSize: 18,
            fontFamily: "Raleway-600"
        },

        time_container: {
            flexDirection: "row",
            gap: 10
        },

        date: {
            fontFamily: "Inter-400",
            alignItems: "center",
            gap: 2,
            flexDirection: "row",
        },

        destination_container: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5
        },
        iata: {
            fontSize: 18,
        },

        // ADDITIONAL INFO

        add_container: {
            marginTop: 20
        },

        add_title: {
            fontSize: 16,
            fontFamily: "Raleway-600"
        },

        add_infos: {
        },

        upload: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,

            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 5,
            padding: 10,
            marginTop: 20,
        }
    }
})

export { s }