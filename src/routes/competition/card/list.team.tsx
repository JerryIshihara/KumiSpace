import React, { useContext, useMemo } from "react";
import "./style.less";
import { Avatar, Button, Divider, Tag } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import { IconLanguage } from "@arco-design/web-react/icon";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "context/auth";
import { useUser } from "context/user";
import { MemberProps, TeamProps } from "types/kaggle";
import { TextEllipsis, UserItem } from "components";
import { Bullet } from "utils/text.constant";
import JoinTeamForm from "./joinTeamForm";

interface Props {
	team: TeamProps;
	last?: boolean;
}

const TeamCard: React.FC<Props> = ({ team, last }: Props) => {
	const userContext = useUser();
	const navigate = useNavigate();
	const showJoinButton = useMemo(
		() =>
			team.members.findIndex(
				(member: MemberProps) =>
					member.user.public_id === userContext.user?.public_id
			) < 0,
		[userContext.user?.public_id, team]
	);
	return (
		<>
			<div
				className="strm-page-card"
				style={{
					display: "flex",
					flexDirection: "row",
					padding: "8px",
				}}
			>
				<div
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						margin: 0
					}}
				>
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<TextEllipsis
							numLines={1}
							style={{ fontSize: 18, fontWeight: "bold", width: "fit-content" }}
						>
							{team.name}
						</TextEllipsis>
					</div>
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "row",
							gap: "8px",
						}}
					>
						{team.members.map((member: MemberProps) => (
							<Avatar
								key={member.user.public_id}
								size="large"
								src={member.user.avatar?.url}
								icon={<UserOutlined />}
							/>
							// <UserItem
							// 	key={member.user.public_id}
							// 	profile={member.user.profile}
							// 	url={member.user.avatar?.url}
							// 	language={member.language}
							// 	skills={member.user.skills}
							// />
						))}
					</div>
				</div>
			</div>
			{!last && <Divider style={{margin: "8px 0"}}/>}
		</>
	);
};

export default TeamCard;
