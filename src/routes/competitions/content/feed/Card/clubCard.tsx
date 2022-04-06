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
				<div className="strm-card-image-container">
					<Avatar
						className="strm-card-avatar"
						size={50}
						icon={<UserOutlined />}
					/>
					<img className="strm-card-image" alt="alt" src={event_img} />
				</div>
				<div className="strm-card-avatar-title-container">
					<div className="strm-card-title-container">
						<TextEllipsis numLines={2} style={{fontSize: 17, fontWeight: '600', color: "InfoText"}}>
							{/* <h3> */}
								{props.title}
								{Math.random() > 0.5
									? "This is a great title! This is a great title! This is a great title! This is a great title! This is a great title! This is a great title!"
									: "CLub name"}
							{/* </h3> */}
						</TextEllipsis>
						<TextEllipsis numLines={2} className="strm-card-title-container-info">
							{/* <h3> */}
								{props.title}
								{Math.random() > 0.5
									? "This is a competition description! This is a great title! This is a great title! This is a great title! This is a great title! This is a great title!"
									: "CLub name"}
							{/* </h3> */}
						</TextEllipsis>
						{/* <TextEllipsis numLines={2}> */}
						{/* <h4 className="strm-card-title-container-info">
							802 members
							{Bullet}
							928 followers
						</h4> */}
						<h4 style={{width: '100%'}}>
							{/* <div className="strm-card-team-num">{}</div> */}{Math.floor(Math.random() * 100)} teams to join <div style={{display: 'inline-block', alignSelf: 'right'}}>{Math.floor(Math.random() * 100)} days to go</div>
						</h4>
						{/* </TextEllipsis> */}
					</div>
				</div>
			</a>
		</div>
	);
};

export default ClubCard;
