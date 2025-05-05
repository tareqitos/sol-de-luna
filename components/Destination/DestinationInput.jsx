import { useMemo, useState } from "react";
import { generateDestinationEmoji } from "../../services/services";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Txt from "../Utils/Txt";
import { TextInput } from "react-native-paper";
import { DESTINATION } from "../../locales/languagesConst";

export default function DestinationInput({ value, setValue, addDestination, t, colors, typography }) {

    const [emoji, setEmoji] = useState(generateDestinationEmoji());

    const greetingsArr = t("greetings", { returnObjects: true });
    const questionsArr = t("travelQuestions", { returnObjects: true });

    const randomGreeting = useMemo(() => greetingsArr[Math.floor(Math.random() * greetingsArr.length)], [t]);
    const randomQuestion = useMemo(() => questionsArr[Math.floor(Math.random() * questionsArr.length)], [t]);

    const handleAddDestination = (emoji, dest) => {
        if (dest && dest.length > 0) {
            addDestination(`${emoji} ${dest}`)
            setValue("")

        } else {
            console.log("Value is empty")
        }
    }

    const updateEmoji = () => {
        setEmoji(generateDestinationEmoji())
    }

    return (
        <View style={styles.container}>
            <Txt style={[typography.body, styles.greetings]}>
                {t(randomGreeting)},
            </Txt>
            <Txt style={[typography.body, styles.greetings]}>
                {t(randomQuestion)}
            </Txt>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={updateEmoji} style={{ zIndex: 2 }} hitSlop={{ top: 10, bottom: 10, right: 10 }}>
                    <Txt style={{ fontSize: 24 }}>
                        {emoji}
                    </Txt>
                </TouchableOpacity>
                <TextInput
                    mode="flat"
                    value={value}
                    maxLength={30}
                    onChangeText={setValue}
                    placeholder={t(DESTINATION.PLACEHOLDER)}
                    style={{ flex: 1, backgroundColor: colors.background }}
                    right={<TextInput.Icon icon="plus" size={24} onPress={() => { handleAddDestination(emoji, value) }} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: .7,
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    destinations: {
        marginVertical: 20,
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap"
    },

    item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },

    greetings: {
        fontSize: 32
    }
})