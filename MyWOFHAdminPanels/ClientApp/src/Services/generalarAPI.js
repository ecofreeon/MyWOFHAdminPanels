import { notification } from 'antd';



export var generalAPI = {
    showNotificationError: (message, description) => {
        notification.error({
            message: message,
            description: description,
            duration: 15,
            placement: 'bottomRight'
        })
    },

    showNotificationWarning: (message, description) => {
        notification.warning({
            message: message,
            description: description,
            duration: 15,
            placement: 'bottomRight'
        })
    }
}