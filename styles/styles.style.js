
import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    header: {
        container: {
            alignItems: "baseline",
            flexDirection: "row",
            paddingLeft: 20,
            marginVertical: 20,
            flex: 1,
            gap: 10,
        },

        title_container: {
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
        },
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
            // position: "relative",
            // bottom: 0,
            // left: 0,
            // right: 0,
            paddingHorizontal: 40,
            paddingTop: 20,
            paddingBottom: 40,

            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 2,
            // },
            // shadowOpacity: 0.1,
            // shadowRadius: 4.65,

            // elevation: 50,
        }
    },

    text: {
        text: {
            fontSize: 14
        }
    },

    footer: {
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
        },

        tab: {
            alignItems: "center"
        }
    },

    form: {
        container: {
            marginBottom: 50,
            gap: 10
        },

        input_container: {
            gap: 5,
        },
        
        input: {
            borderRadius: 5,
            justifyContent: "center",
            paddingHorizontal: 0,
        },

        route_input: {
            width: 120
        },

        button: {
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 50,
        }
    },

    calendar: {
        background: {
            marginVertical: 10,
            marginHorizontal: 1,
            paddingBottom: 0,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },

        day: {
            borderRadius: 5,
            borderWidth: 1
        },

        day_cell: {
            paddingVertical: 5,
            paddingHorizontal: 8,
            borderRadius: 5,
        },

        header: {
            fontSize: 18,
            paddingVertical: 10,
        }
    }
})

export { s }