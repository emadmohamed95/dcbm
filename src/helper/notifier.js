import { success, error, warning, info, removeAll } from 'react-notification-system-redux';
import store from "../store/index";


const defaultNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    // title: 'Error',
    message: 'Default Message',
    position: 'tr',
    autoDismiss: 3,
};

export const sendNotification = (message, type) => {

    const notificationOpts = {...defaultNotificationOpts,...{message}}
    switch (type) {
        case "success":
            store.dispatch(success(notificationOpts))
            break;
        case "error":
            store.dispatch(error(notificationOpts))
            break;
        case "warning":
            store.dispatch(warning(notificationOpts))
            break;
        case "info":
            store.dispatch(info(notificationOpts))
            break;
        default:
            store.dispatch(info(defaultNotificationOpts));
    }

}