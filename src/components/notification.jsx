
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { notification } from 'antd';

const Notification = (props) => {

    const [notificationApi, contextHolder] = notification.useNotification();
    const notificationState = useSelector((state) => state.user.newNotification)

    useEffect(() => {
        console.log("Notification state change")
        if (notificationState && notificationState.type) {
            if (notificationState.type == 'success') {
                notificationApi.success({
                    message: notificationState.message
                });
            } else if (notificationState.type == 'error') {
                notificationApi.error({
                    message: notificationState.message
                });
            }
        }
    }, [notificationState])


    return (
        // { contextHolder }
        <div>
            {contextHolder}
        </div>
    )
}

export default Notification