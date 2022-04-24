import React from "react";
import Header from "components/Header";
import NotificationItem from "./notificationItem";

const NotificationPage: React.FC = () => {
	return (
		<div className="strm-page body-center">
            <Header logout={() => { }} />
            <div className="notification-container">
                <h2>Notifications</h2>
                {[...Array(20).keys()].map(_ => <NotificationItem>asdasdas</NotificationItem>)}
			</div>
		</div>
	);
};

export default NotificationPage;
