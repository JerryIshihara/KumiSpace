import React, { useMemo } from "react";
import "./style.less";

import { Avatar, Button, Divider, notification } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { TextEllipsis } from "components";
import { NotificationProps } from "types/notification";
import { timePassed } from "utils/time";
import { Link } from "react-router-dom";

interface Props {
	item: NotificationProps;
	last: boolean;
	onDelete: () => void;
	onRead: () => void;
}

const NotificationItem: React.FC<Props> = ({ item, last, onDelete, onRead }) => {
	const date = useMemo(() => new Date(item.created_on), [item.created_on]);
	const redirect = useMemo(() => {
		switch (item.type) {
			default:
				return `/competitions/${item.redirect_memo}/?tab=my-team`;
		}
	}, [item.type, item.redirect_memo]);
	return (
		<>
			<div
				className={`notification-item ${
					item.is_read ? "" : "notification-item-unread"
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
					src={item.image_url}
				/>
				<div className="notification-content">
					<h3>{item.title}</h3>
					<Link to={redirect} style={{ color: "InfoText" }} onClick={onRead}>
						<div dangerouslySetInnerHTML={{ __html: item.text }} />
					</Link>
					<div className="horizontal-center">
						<span className="notification-date">{timePassed(date)}</span>
						<Button
							style={{ margin: "0 0 0 auto", color: "GrayText" }}
							type="text"
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={onDelete}
						/>
					</div>
				</div>
			</div>
			{!last && <Divider style={{ margin: 0 }} />}
		</>
	);
};

export default NotificationItem;
