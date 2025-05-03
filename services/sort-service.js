export const filteredDataByDateAsc = (data) => {
    return data.sort((x, y) => {
        return new Date(x.departureDate || x.checkIn || x.departureTime) - new Date(y.departureDate || y.checkIn || y.departureTime);
    });
}

export const filteredDataByDateDesc = (data) => {
    return data.sort((x, y) => {
        return new Date(y.departureDate || y.checkIn || y.departureTime) - new Date(x.departureDate || x.checkIn || x.departureTime);
    });
}

export const filteredDataByNameAsc = (data) => {
    return data.sort((x, y) => {
        return x.name.localeCompare(y.name);
    });
}

export const filteredDataByNameDesc = (data) => {
    return data.sort((x, y) => {
        return y.name.localeCompare(x.name);
    });
}
