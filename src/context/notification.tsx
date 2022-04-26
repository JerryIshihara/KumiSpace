import React, { useEffect, useState } from "react";

import { NotificationProps } from "types/notification";
import { get_notifications } from "api/notification";
import { useAuth } from "./auth";


export interface NotificationContextProps {
    unread: Array<NotificationProps>;
    read: Array<NotificationProps>;
}

export const NotificationContext = React.createContext<Partial<NotificationContextProps> | any>(
	{}
);

export const NotificationContextProvider = (props: any) => {
    const auth = useAuth()
    const [unread, setUnread] = useState<Array<NotificationProps>>([]);
    const [read, setRead] = useState<Array<NotificationProps>>([]);
    

    useEffect(() => {
        if (auth.token) {
            get_notifications(auth.token).then(res => {
                console.log(res.data);
                setRead(res.data.filter((notification: NotificationProps) => notification.is_read))
                setUnread(res.data.filter((notification: NotificationProps) => !notification.is_read))
            })
        } else {
            setRead([])
            setUnread([]);
        }
    }, [auth.token])
    

	return (
		<NotificationContext.Provider
			value={{
				unread,
				read,
			}}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export function useNotification() {
	return React.useContext(NotificationContext) as NotificationContextProps;
}
