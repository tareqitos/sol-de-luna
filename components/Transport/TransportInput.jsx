import { SegmentedButtons, useTheme } from "react-native-paper";
import { FORM } from "../../locales/languagesConst";

export default function TransportInput({ transportType, saveTransportType, t }) {
    const { colors } = useTheme();
    return (
        <SegmentedButtons
            value={transportType}
            onValueChange={saveTransportType}
            buttons={[
                {
                    value: 'train',
                    label: t(FORM.TRANSPORT_TYPE_TRAIN),
                    icon: 'train',
                },

                {
                    value: 'bus',
                    label: t(FORM.TRANSPORT_TYPE_BUS),
                    icon: 'bus',
                },

                {
                    value: 'car',
                    label: t(FORM.TRANSPORT_TYPE_CAR),
                    icon: 'car',
                }
            ]}
        />
    )
}