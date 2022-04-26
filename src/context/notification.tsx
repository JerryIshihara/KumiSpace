import React, { useEffect, useState } from "react";
import { login, signup, log_out, refresh } from "api/auth";
import { NotificationProps } from "types/notification";


export interface NotificationContextProps {
    unread: Array<NotificationProps>;
    read: Array<NotificationProps>;
}

export const NotificationContext = React.createContext<Partial<NotificationContextProps> | any>(
	{}
);

export const NotificationContextProvider = (props: any) => {
    const [unread, setUnread] = useState<Array<NotificationProps>>([]);
    const [read, setRead] = useState<Array<NotificationProps>>([]);
    

	
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
