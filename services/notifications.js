import * as Notifications from "expo-notifications"
import { mergeDateAndTime } from "./date-service";

export const initializeNotifications = async () => {
    await Notifications.requestPermissionsAsync();
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        })
    })
}
export const scheduleNotification = async (title, body, departureDay, departureTime) => {
    try {

        const departureDate = new Date(mergeDateAndTime(departureDay, departureTime))
        const departureDateUTC = new Date(departureDate.getTime() + departureDate.getTimezoneOffset() * 60000); // Convert to UTC to avoid timezone issues
        // Calculate the time one day before departure
        const triggerTime = new Date(departureDateUTC.getTime() - 24 * 60 * 60 * 1000);

        // Ensure the trigger time is in the future
        if (triggerTime <= new Date()) {
            console.log("Departure time is too soon to schedule a notification.");
            return;
        }

        console.log("TRIGGER TIME: ", triggerTime)

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
            },
            trigger: triggerTime,
        });

        console.log(`Notification scheduled for one day before departure. ID: ${notificationId}`);
        return notificationId;
    } catch (error) {
        console.error("Error scheduling notification:", error);
    }
};

export const cancelNotification = async (id) => {
    if (!id || id === undefined) return console.log("Id is null or undefined")
    try {
        await Notifications.cancelScheduledNotificationAsync(id)
        console.log(`Notification with id: ${id} successfully canceled`)
    } catch (error) {
        console.error("Error canceling notification: ", error)
    }
}