import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
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

const ClubCard: React.FC<Props> = props => {
	return (
		<div className="strm-page-card">
			<div className="strm-page-card-ellipsis">
				<EllipsisOutlined />
			</div>
			<div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar shape="square" size={60} icon={<UserOutlined />} />
				</div>
				<div className="strm-page-card-club-title-container">
					<TextEllipsis numLines={1}>
						<h2>University of Toronto Student Union</h2>
					</TextEllipsis>
					<TextEllipsis numLines={1}>
						<h3>
							Co-founder { Bullet } Executive 
						</h3>
					</TextEllipsis>
					<TextEllipsis numLines={1}>
						<span>Joined at May 5, 2021</span>
					</TextEllipsis>
					<Divider style={{marginBottom: 0}}/>
				</div>
			</div>

			{/* <img className="strm-page-card-image" alt="alt" src={props.img} />
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
			</div> */}
			
		</div>
	);
};

export default ClubCard;
