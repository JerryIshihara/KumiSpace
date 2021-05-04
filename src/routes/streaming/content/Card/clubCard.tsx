import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import event_img from "assets/event.png";
import { TextEllipsis } from "components";

const BULLET = " \u2022 ";

interface Props {
	title?: string;
}

const ClubCard: React.FC<Props> = props => {
	return (
		<div className="strm-card">
			<img className="strm-card-image" alt="alt" src={event_img} />
			<div className="strm-card-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={40} icon={<UserOutlined />} />
				</div>
				<div className="strm-card-title-container">
					<TextEllipsis numLines={2}>
						<h3>
							{props.title}
							{Math.random() > 0.5
								? "This is a great title! This is a great title! This is a great title! This is a great title! This is a great title! This is a great title!"
								: "CLub name"}
						</h3>
					</TextEllipsis>
					<TextEllipsis numLines={2}>
						<h3 className="strm-card-title-container-info">
							102 members
							{BULLET}
							9289 followers
						</h3>
					</TextEllipsis>
				</div>
			</div>
		</div>
	);
};

export default ClubCard;
