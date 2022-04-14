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
	profile: { username: string } | any;
	skills?: Array<any>;
	url?: string;
	img?: string;
}

const UserItem: React.FC<Props> = (props: Props) => {
	return (
		<div className="user-item-container">
			<Avatar size={45} icon={<UserOutlined />} />
			<div className="user-item-title">
				<TextEllipsis style={{ fontSize: 14, fontWeight: "bold" }}>
					{props.profile?.username}
				</TextEllipsis>
				<TextEllipsis style={{ fontSize: 12 }} numLines={2}>
					{props.profile.occupation} @ {props.profile.organization}
				</TextEllipsis>
				<div className="user-item-tags">
					{props.skills?.map((skill: any) => (
						<Tag style={{ margin: 0 }}>{skill.name}</Tag>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserItem;
