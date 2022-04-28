import React from "react";
import "./style.less";
import Header from "components/Header";
import NotificationItem from "./notificationItem";
import { useNotification } from "context/notification";
import { NotificationProps } from "types/notification";

const NotificationPage: React.FC = () => {
	const notification = useNotification();
	return (
		<div className="strm-page body-center">
			<Header />
			<div className="notification-container">
				<h2>Notifications</h2>
				{notification.unread.map((item: NotificationProps, index: number) => (
					<NotificationItem
						key={item.public_id}
						item={item}
						onRead={() => {
                            notification.read_by_pid(item.public_id)
                        }}
                        onDelete={() => {
                            notification.delete_by_pid(item.public_id)
                        }}
						last={index === notification.unread.length - 1}
					/>
				))}
				{notification.read.map((item: NotificationProps, index: number) => (
					<NotificationItem
						key={item.public_id}
						item={item}
						onRead={() => {}}
                        onDelete={() => {
                            notification.delete_by_pid(item.public_id)
                        }}
						last={index === notification.unread.length - 1}
					/>
				))}
			</div>
		</div>
	);
};

export default NotificationPage;
