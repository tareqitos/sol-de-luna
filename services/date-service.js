export const ConvertDateToString = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("us-US", { month: "long", day: "numeric", year: "numeric" });
}

export const ConvertDateToNum = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("us-US", { month: "numeric", day: "numeric", year: "numeric" });
}

export const ConvertTimetoString = (time) => {
    const d = new Date(time)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const DateTimeToDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
}

export const DateTimeToTime = (time) => {
    const d = new Date(time);
    // Get the time portion and remove the seconds and milliseconds
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

export const ConvertDateAndTimeToString = (date) => {
    return `${ConvertDateToNum(date)} ${ConvertTimetoString(date)}`
}