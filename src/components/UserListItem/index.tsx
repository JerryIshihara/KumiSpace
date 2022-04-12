import React from "react";
import "./style.less";
import { Avatar, Button, Divider, Tag } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { TextEllipsis } from "components";
import { Bullet } from "utils/text.constant";

interface Props {
	url?: string;
	img?: string;
}

const UserItem: React.FC<Props> = props => {
	return (
		<div className="user-item-container">
			<Avatar size={45} icon={<UserOutlined />} />
			<div className="user-item-title">
				<TextEllipsis style={{ fontSize: 14, fontWeight: "bold" }}>
					Jerry Ishihara
				</TextEllipsis>
				<TextEllipsis style={{ fontSize: 12 }} numLines={2}>
					University of Toronto
				</TextEllipsis>
				<div className="user-item-tags">
					{[...Array(Math.min(5, Math.floor(Math.random() * 10)))]
						.fill("")
						.map(_ => (
							<Tag style={{ margin: 0 }}>This is a tag</Tag>
						))}
				</div>
			</div>
		</div>
	);
};

export default UserItem;
