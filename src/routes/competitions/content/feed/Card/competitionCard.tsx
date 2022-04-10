import React from "react";
import "./style.less";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import event_img from "assets/event.png";
import { TextEllipsis } from "components";
import { Bullet } from "utils/text.constant";
import {KaggleCompetitionProps  } from "../../../../../api/kaggle";

interface Props {
	item: KaggleCompetitionProps
}

const ClubCard: React.FC<Props> =( { item }) => {
	const url = "https://picsum.photos/" + 200 + "/" + 300 + "?random=1";
	const date = new Date(item.deadline)
	const today = Date.now()
	const diffTime = date.getTime() - today
	const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffMonth = Math.floor(diffDay / 30)
	return (
		<div className="strm-card">
			<a href={`/competitions/${item.name}`}>
				<div className="strm-card-image-container">
					<img
						className="strm-card-image"
						alt="alt"
						src={item.competition_header_image_url || url}
					/>
					<div className="strm-card-avatar">
						<Avatar src={item.organization_thumbnail_url} className="shadow" size={45} icon={<UserOutlined />} />
					</div>
				</div>
				<div className="strm-card-avatar-title-container">
					<div className="strm-card-title-container">
						<TextEllipsis
							numLines={2}
							style={{ fontSize: 16, fontWeight: "600", color: "InfoText" }}
						>
							{/* <h3> */}
							{item.title}
							{/* </h3> */}
						</TextEllipsis>
						<TextEllipsis
							numLines={1}
							className="strm-card-title-container-info"
						>
							{/* <h3> */}
							{item.description}
							{/* </h3> */}
						</TextEllipsis>
						{/* <TextEllipsis numLines={2}> */}
						{/* <h4 className="strm-card-title-container-info">
							802 members
							{Bullet}
							928 followers
						</h4> */}
						<h4>
							{item.category}
						</h4>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<h4>
								{/* <div className="strm-card-team-num">{}</div> */}
								{Math.floor(Math.random() * 100)} teams to join
							</h4>
							<div
								className="strm-card-title-container-days"
								style={{ marginLeft: "auto" }}
							>
								{ diffMonth > 0 ? (diffMonth > 2 ? "ongoing" :`${diffMonth} month${diffMonth === 1 ? "" : "s"} to go`) : `${diffDay} days to go`}
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