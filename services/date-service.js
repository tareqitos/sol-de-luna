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
    return d.toISOString().split("T")[1].substring(0, 5);
}

export const MergeDateTime = (date, time) => {
    // Ensure date and time are strings before concatenating
    const dateStr = DateTimeToDate(date);
    const timeStr = DateTimeToTime(time);
    return `${dateStr}T${timeStr}`;
}