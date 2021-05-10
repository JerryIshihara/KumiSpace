import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import event_img from "assets/event.png";
import { TextEllipsis } from "components";
import { Bullet } from "utils/text.constant";

interface Props {
	title?: string;
}

const ClubCard: React.FC<Props> = props => {
	return (
		<div className="strm-card">
			<a href={`/club/club ${0}`}>
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
						{/* <TextEllipsis numLines={2}> */}
						<h4 className="strm-card-title-container-info">
							802 members
							{Bullet}
							928 followers
						</h4>
						<h4 className="strm-card-title-container-date">
							Establish in May 2021
						</h4>
						{/* </TextEllipsis> */}
					</div>
				</div>
			</a>
		</div>
	);
};

export default ClubCard;
