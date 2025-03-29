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

        title_container: {
            position: "absolue",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 20,
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
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 40,
            paddingTop: 20,
            paddingBottom: 40,

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

    form: {
        container: {
            gap: 20
        },

        input_container: {
            gap: 5
        },

        input: {
            width: "auto",
            height: 40,
            borderRadius: 5,
            borderWidth: 1,
            justifyContent: "center",
            paddingHorizontal: 10,
            fontFamily: "Raleway-400",
        },

        route_input: {
            width: 80
        },

        button: {
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 50,
        }
    }
})

export { s }