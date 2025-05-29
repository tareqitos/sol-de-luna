import { View } from "react-native";
import Txt from "./Utils/Txt";
import { Icon, useTheme } from "react-native-paper";
import { useLocalization } from "../hook/localization";
import { CARDS } from "../locales/languagesConst";
import { useTranslation } from "react-i18next";

export const SleepsLeft = ({ departureDate }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const today = new Date();
    const departure = new Date(departureDate);
    const timeDiff = Math.ceil((departure - today) / (1000 * 60 * 60 * 24));

    return (
        <>
            {timeDiff > 0 ?
                <View style={{ flexDirection: "row", alignItems: "center", gap: 0 }}>
                    <Icon source="weather-night" color={colors.primary} size={16} />
                    <Txt> {`${t(CARDS.ONLY)} ${timeDiff} ${t(timeDiff === 1 ? CARDS.SLEEP_LEFT : CARDS.SLEEPS_LEFT)}`}</Txt>
                </View> : null}
        </>
    )



}