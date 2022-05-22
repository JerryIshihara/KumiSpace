import React, { useEffect, useState } from "react";

import { NotificationProps } from "types/notification";
import {
	get_notifications,
	delete_notification,
	read_notification,
} from "api/notification";
import { useAuth } from "./auth";

export interface NotificationContextProps {
	unread: Array<NotificationProps>;
	read: Array<NotificationProps>;
	delete_by_pid: (pid: string) => void;
	read_by_pid: (pid: string) => void;
}

export const NotificationContext = React.createContext<
	Partial<NotificationContextProps> | any
>({});

export const NotificationContextProvider = (props: any) => {
	const auth = useAuth();
	const [unread, setUnread] = useState<Array<NotificationProps>>([]);
	const [read, setRead] = useState<Array<NotificationProps>>([]);

	useEffect(() => {
		if (auth.token) {
			fetch_notifications();
		} else {
			setRead([]);
			setUnread([]);
		}
	}, [auth.token]);

	const fetch_notifications = () => {
		get_notifications(auth.token)
			.then(res => {
				console.log(res.data);
				setRead(
					res.data.filter(
						(notification: NotificationProps) => notification.is_read
					)
				);
				setUnread(
					res.data.filter(
						(notification: NotificationProps) => !notification.is_read
					)
				);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const read_by_pid = (pid: string) => {
		read_notification(pid)
			.then(res => {
				fetch_notifications();
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const delete_by_pid = (pid: string) => {
		delete_notification(pid)
			.then(res => {
				fetch_notifications();
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	return (
		<NotificationContext.Provider
			value={{
				unread,
				read,
				delete_by_pid,
				read_by_pid,
			}}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export function useNotification() {
	return React.useContext(NotificationContext) as NotificationContextProps;
}
