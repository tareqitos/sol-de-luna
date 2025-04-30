// import * as Notifications from 'expo-notifications'
// import * as Device from 'expo-device'

// export const requestNotificationPermissions = async () => {
//     if (Device.isDevice) {

//         const { status } = await Notifications.requestPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Permission for notifications not granted')
//         }
//     } else {
//         // console.warn("Must use a physical device to get push notifications")
//     }
// }

// export const initializeNotifications = async () => {
//     await requestNotificationPermissions();
//     Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//             shouldShowAlert: true,
//             shouldPlaySound: true,
//             shouldSetBadge: true,
//         }),
//     });
// }


// export const scheduleDepartureReminder = (seconds) => {
//     try {
//         // const oneDayBefore = new Date(departureDate);
//         // oneDayBefore.setDate(oneDayBefore.getDate() - 1);

//         Notifications.scheduleNotificationAsync({
//             content: {
//                 title: "Your trip is coming up!",
//                 body: "Don't forget, your departure is tomorrow.",
//             },
//             trigger: { seconds } || null,
//         });
//     } catch (error) {
//         console.error("Error scheduling notification:", error);
//         return null;
//     }
// } 