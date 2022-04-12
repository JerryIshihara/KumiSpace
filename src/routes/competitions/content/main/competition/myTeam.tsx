import React from "react";
import { useHistory } from "react-router-dom";
import "./style.less";
import { Avatar, Button, Divider, Input } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { TextEllipsis, UserItem } from "components";
import { Bullet } from "utils/text.constant";
import Messages from "components/Messages";

interface Props {
	url?: string;
	img?: string;
}

const ClubCard: React.FC<Props> = props => {
	const numMember = Math.max(1, Math.min(4, Math.floor(Math.random() * 10)));
	const history = useHistory();
	return (
		<div className="strm-page-card my-team-container">
			<div
				style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
			>
				<Input.Group compact>
					<Input
						style={{ width: "calc(50%)", fontWeight: "bold" }}
						defaultValue="Team name"
					/>
					<Button type="primary">Save</Button>
				</Input.Group>
				{/* <span
					style={{ fontSize: 20, fontWeight: "bold", width: "fit-content" }}
				>
					({numMember}/5)
				</span> */}
				<Button style={{ marginLeft: "auto" }}>Leave the team</Button>
				<Button
					type="primary"
					style={{ fontWeight: 600, marginLeft: "auto", color: "white" }}
					// onClick={() => {
					// 	history.push(
					// 		`/competitions/${competitionName}/new?type=team`
					// 	);
					// }}
					// href={`/competitions/${competitionName}/team/new`}
				>
					Create a team
				</Button>
			</div>
			<Divider />
			<div className="my-team-members">
				{[...Array(numMember)].fill("").map(_ => (
					<UserItem />
				))}
            </div>
            <Divider />
            <Messages />
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
