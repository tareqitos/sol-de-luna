import { Button, Chip, useTheme } from "react-native-paper"
import Txt from "../Utils/Txt"

export const CardElementChip = ({ icon, onPress, element, type }) => {
    const { colors, typography } = useTheme();

    return (
        <>
            {type === "button" ?
                (
                    <Button
                        icon={icon}
                        onPress={onPress}
                        style={{ flexWrap: "wrap", borderRadius: 5, color: colors.onSurface, backgroundColor: colors.surface, }}
                    >
                        {element}
                        <Txt style={[typography.bodyInter, { fontSize: 16 }]}>
                        </Txt>

                    </Button >
                ) : (
                    <Chip icon={icon} onPress={onPress} style={{ borderRadius: 5, color: colors.onSurface, backgroundColor: colors.surface, }} >
                        <Txt style={[typography.bodyInter, { fontSize: 14 }]}>
                            {element}
                        </Txt>
                    </Chip>

                )
            }
        </>
    )
}