import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import event_img from "assets/event.png";
import { TextEllipsis } from "components";
import { Bullet } from "utils/text.constant";

interface Props {
	title?: string;
	imageUrl?: string;
}

const ClubCard: React.FC<Props> = props => {
	const url = "https://picsum.photos/" + 200 + "/" + 300 + "?random=1";
	return (
		<div className="strm-card">
			<a href={`/competitions/${"competition-name"}`}>
				<div className="strm-card-image-container">
					<img
						className="strm-card-image"
						alt="alt"
						src={props.imageUrl || url}
					/>
					<div className="strm-card-avatar">
						<Avatar className="shadow" size={45} icon={<UserOutlined />} />
					</div>
				</div>
				<div className="strm-card-avatar-title-container">
					<div className="strm-card-title-container">
						<TextEllipsis
							numLines={2}
							style={{ fontSize: 16, fontWeight: "600", color: "InfoText" }}
						>
							{/* <h3> */}
							{props.title}
							{Math.random() > 0.5
								? "This is a great title! This is a great title! This is a great title! This is a great title! This is a great title! This is a great title!"
								: "CLub name"}
							{/* </h3> */}
						</TextEllipsis>
						<TextEllipsis
							numLines={2}
							className="strm-card-title-container-info"
						>
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
						<div style={{ display: "flex", flexDirection: "row" }}>
							<h4>
								{/* <div className="strm-card-team-num">{}</div> */}
								{Math.floor(Math.random() * 100)} teams to join
							</h4>
							<div
								className="strm-card-title-container-days"
								style={{ marginLeft: "auto" }}
							>
								{Math.floor(Math.random() * 100)} days to go
							</div>
						</div>
						{/* </TextEllipsis> */}
					</div>
				</div>
			</a>
		</div>
	);
};

export default ClubCard;
