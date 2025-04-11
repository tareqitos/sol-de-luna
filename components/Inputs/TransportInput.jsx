import { SegmentedButtons } from "react-native-paper";

export default function TransportInput({ transportType, saveTransportType }) {
    return (
        <SegmentedButtons
            value={transportType}
            onValueChange={saveTransportType}
            buttons={[
                {
                    value: 'train',
                    label: 'Train',
                    icon: 'train',
                },

                {
                    value: 'bus',
                    label: 'Bus',
                    icon: 'bus',
                },

                {
                    value: 'car',
                    label: 'Car',
                    icon: 'car',
                }
            ]}
        />
    )
}