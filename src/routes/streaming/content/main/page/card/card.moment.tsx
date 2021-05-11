import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined
} from "@ant-design/icons";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { TextEllipsis } from "components";
import { Bullet } from "utils/text.constant";

interface Props {
	url?: string;
	img?: string;
}

const MomentCard: React.FC<Props> = props => {
	return (
		<div className="strm-page-card">
			<div className="strm-page-card-ellipsis">
			<EllipsisOutlined />
			</div>
			<div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={45} icon={<UserOutlined />} />
				</div>
				<div className="strm-page-card-title-container">
					<TextEllipsis numLines={1}>
						<h3>User name</h3>
					</TextEllipsis>
					<TextEllipsis numLines={1}>
						<p>User description</p>
					</TextEllipsis>
				</div>
			</div>
			<TextEllipsis numLines={2}>
				<p>
					This is a great Club! This is a greasdat Club! This is a great Club! This
					is a great Club! This is a great Clasdfaub! This is a great Club! This is a great Club! This is a great Club! This is a great Club! This
					is a great Club! This is a great Clasdfaub! This is a great Club!
				</p>
			</TextEllipsis>
			<img className="strm-page-card-image" alt="alt" src={props.img} />
			<div className="strm-page-card-social-activity">
				<LikeOutlined />
				<MessageOutlined />
				<SendOutlined />
				<Divider type="vertical" />
				<span className="strm-page-card-social-activity-stats">
					232 likes {Bullet} 432 comments
				</span>
				<Divider type="vertical" />
				<span className="strm-card-date-style">May 5</span>
			</div>
			{/* <div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={30} icon={<UserOutlined />} />
				</div>
				<div className="strm-card-moment-title-container">
					<TextEllipsis numLines={2}>
						<span>
							This is a great titleasfas! This is a great title! This is a great
							title! This is a great title! This is a great title! This is a
							great title!
						</span>
					</TextEllipsis>
				</div>
			</div> */}
			<Divider />
		</div>
	);
};

export default MomentCard;
