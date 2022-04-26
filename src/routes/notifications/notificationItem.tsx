import React, {useMemo} from "react";
import "./style.less";

import { Avatar, Divider } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { TextEllipsis } from "components";
import { NotificationProps } from "types/notification";
import { timePassed } from "utils/time";

interface Props {
    item: NotificationProps;
    last: boolean
}

const NotificationItem: React.FC<Props> = ({ item, last }) => {
    const date = useMemo(() => new Date(item.created_on), [item.created_on])
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
				/>
				<div className="notification-content">
                    <h3>{item.title}</h3>
                    {/* <TextEllipsis>notification title</TextEllipsis> */}
                    <div dangerouslySetInnerHTML={{__html: item.text}}/>
                    <p className="notification-date">{timePassed(date)}</p>
                </div>
			</div>
            {!last && <Divider style={{ margin: 0 }} />}
		</>
	);
};

export default NotificationItem;
