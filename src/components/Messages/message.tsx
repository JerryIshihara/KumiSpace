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

const Message: React.FC<Props> = props => {
	return (
		<div className="message-container">
            <Avatar size={35} icon={<UserOutlined />} style={{ minWidth: '35px' }}/>
			<div className="message-text">
				<TextEllipsis style={{ fontSize: 12, color: "GrayText" }}>
					Jerry Ishihara
				</TextEllipsis>
				<TextEllipsis style={{ fontSize: 13 }} numLines={3}>
					University of Toronto University of Toronto University of Toronto University of Toronto
				</TextEllipsis>
            </div>
		</div>
	);
};

export default Message;
