export const ConvertDateToString = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("us-US", { month: "long", day: "numeric", year: "numeric" });
}

export const ConvertTimetoString = (date) => {
    const d = new Date(date)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}