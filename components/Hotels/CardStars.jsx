import { Icon } from "react-native-paper";

export default function CardStars({ stars }) {
    return (
        <>
            {Array.from({ length: stars }).map((star, index) => (
                <Icon
                    key={index}
                    source={"star"}
                    size={24}
                    color="#FFA50D" />
            ))}
        </>
    )
}