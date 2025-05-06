export const ConvertDateToString = (date, locale) => {
    const d = new Date(date)

    return d.toLocaleDateString(locale, { month: "long", day: "numeric", year: "numeric" });
}

export const ConvertDateToNum = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString("us-US", { month: "numeric", day: "numeric", year: "numeric" });
}

export const ConvertTimeToString = (time) => {
    return time.split("T")[1].substr(0, 5)
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

export const ConvertDateAndTimeToString = (date, time) => {
    return `${ConvertDateToNum(date)} ${ConvertTimetoString(time)}`
}

export const getTimeDifference = (time2, time1) => {
    const result = (Date.parse(time2) - Date.parse(time1));
    return new Date(result).getHours()
}

export const mergeDateAndTime = (date, time) => {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timeZoneOffset);
    const localTime = new Date(time.getTime() - timeZoneOffset);
    return localDate.toISOString().split("T")[0] + "T" + localTime.toISOString().split("T")[1]
}

export const getDayDifference = (day2, day1) => {
    return new Date(day2).toLocaleDateString('en-US', { day: "numeric" }) - new Date(day1).toLocaleDateString('en-US', { day: "numeric" })
}

export const calculateDayBetweenTwoDates = (day1, day2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(day1);
    const secondDate = new Date(day2);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

