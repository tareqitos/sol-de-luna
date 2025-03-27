export const ConvertDateToString = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("us-US", { month: "long", day: "numeric", year: "numeric" });
}