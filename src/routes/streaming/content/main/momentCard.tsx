import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
} from "@ant-design/icons";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { TextEllipsis } from "../../../../components";
import { Bullet } from "utils/text.constant";

interface Props {
	url?: string;
	img?: string;
}

const MomentCard: React.FC<Props> = props => {
	return (
		<div className="strm-card-moment">
			<div className="strm-card-moment-ellipsis">
				<IoEllipsisHorizontalCircleOutline />
			</div>
			<div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={45} icon={<UserOutlined />} />
				</div>
				<div className="strm-card-moment-title-container">
					<TextEllipsis numLines={1}>
						<h3>This is a great Club!</h3>
					</TextEllipsis>
					<TextEllipsis numLines={2}>
						<span>
							This is a great Club! This is a great Club! This is a great Club!
							This is a great Club! This is a great Club! This is a great Club!
						</span>
					</TextEllipsis>
				</div>
			</div>
			<img className="strm-card-moment-image" alt="alt" src={props.img} />
			<div className="strm-card-moment-social-activity">
				<LikeOutlined />
				<MessageOutlined />
				<SendOutlined />
				<Divider type="vertical"/>
				<span className="strm-card-moment-social-activity-stats">232 likes {Bullet} 432 comments</span>
				<Divider type="vertical" />
				<span className="strm-card-moment-social-activity-date">May 5</span>
			</div>
			{/* <div className="strm-card-moment-social-activity-stats">
				<h4>232 likes { Bullet }</h4>
			</div> */}
			<div className="strm-card-moment-avatar-title-container">
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
			</div>
		</div>
	);
};

export default MomentCard;
