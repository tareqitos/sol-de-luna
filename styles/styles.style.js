import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    header: {
        container: {
            position: "absolue",
            alignItems: "baseline",
            flexDirection: "row",
            paddingLeft: 20,
            gap: 10,
        },

        container_addItem: {
            position: "absolue",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 20,
            gap: 0,
        },

        title: {
            fontSize: 42,
        },

        subtitle: {
            fontSize: 24
        }
    },

    home: {
        container: {
            flex: 1,
        },
        title: {
            marginBottom: 10
        },

        cards: {
            flex: 1,
            gap: 20
        },

        tab_bottom_menu: {
            paddingHorizontal: 40,
            paddingTop: 20,
            paddingBottom: 40,
            backgroundColor: "white",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
        }
    },

    text: {
        text: {
            color: "#1a1a1a",
            fontFamily: "Raleway-400",
            fontSize: 14
        }
    },

    footer: {
        container: {
            flexDirection: "row",
            justifyContent: "space-between"
        },

        tab: {
            alignItems: "center"
        }
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export { s }