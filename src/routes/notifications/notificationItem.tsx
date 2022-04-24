import React from "react";
import "./style.less";

import { Avatar, Divider } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { TextEllipsis } from "components";

const NotificationItem: React.FC = () => {
	const isRead = Math.random() > 0.5;
	return (
		<>
			<div
				className={`notification-item ${
					isRead ? "" : "notification-item-unread"
				}`}
			>
				<Avatar
					style={{
						width: 50,
						height: 50,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					icon={<UserOutlined />}
				/>
				<div className="notification-content">
					<h4>Category</h4>
					<TextEllipsis>notification title</TextEllipsis>
					<p className="notification-date">date</p>
                </div>
                <div
					className={`notification-dot ${
						isRead ? "" : "notification-dot-unread"
					}`}
				/>
			</div>
			<Divider style={{ margin: 0 }} />
		</>
	);
};

export default NotificationItem;
