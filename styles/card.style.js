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
            paddingHorizontal: 5,
            paddingVertical: 20,
            // marginTop: 20,
            gap: 15,
        },

        title_container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },

        title: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5
        },

        add_item: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        },
    },
    card: {
        container: {
            padding: 20,
            gap: 10,
            borderRadius: 10,
        },

        icons_container: {
            flexDirection: "row",
            position: "absolute",
            right: 10,
            top: 10,
            alignItems: "center"
        },

        icon_container: {
            padding: 5,
            borderRadius: 5,
        },

        title_container: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10
        },

        time_container: {
            flexDirection: "row",
            gap: 10
        },

        date: {
            alignItems: "center",
            gap: 4,
            flexDirection: "row",
        },

        destination_container: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            borderRadius: 5,
            padding: 10,
            gap: 5
        },

        // ADDITIONAL INFO

        add_infos: {
            height: 100,
            borderRadius: 5,
            padding: 10
        },

        upload: {
            marginTop: 20,
        }
    }
})

export { s }