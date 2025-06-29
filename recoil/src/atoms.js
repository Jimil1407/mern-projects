import { atom } from "recoil";
import { selector } from "recoil";
export const notifications = atom({
    key: "networkAtom",
    default: {
        network: 4,
        jobs: 6,
        messaging: 3,
        notifications: 3
    }
});

export const totalNotificationSelector = selector ({
    key: "totalNotificationSelector",

    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network + 
        allNotifications.jobs +
        allNotifications.messaging +
        allNotifications.notifications
    }
})