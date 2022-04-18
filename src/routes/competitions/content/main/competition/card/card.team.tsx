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

import { UserProps, useUser } from "context/user";
import { join_team } from "api/kaggle";
import { TextEllipsis, UserItem } from "components";
import { Bullet } from "utils/text.constant";
import { useAuth } from "context/auth";

export interface MemberProps {
	user: UserProps;
	role: "leader" | "member";
	language?: string;
}

export interface TeamProps {
	name: string;
	public_id: string;
	num_members: number;
	description?: string;
	members: Array<MemberProps>;
}

interface Props {
	team: TeamProps;
}

const TeamCard: React.FC<Props> = ({ team }: Props) => {
	const auth = useAuth();
	const userContext = useUser();

	const showJoinButton = useMemo(
		() =>
			team.members.findIndex(
				(member: MemberProps) =>
					member.user.public_id === userContext.user?.public_id
			) < 0,
		[userContext.user?.public_id, team]
	);
	const joinTeam = () => {
		join_team(auth.token, team.public_id, undefined)
			.then(res => {
				console.log(res.data);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};
	return (
		<div
			className="strm-page-card strm-card-team-container"
			style={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					margin: 0,
				}}
			>
				<div
					style={{
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
					{showJoinButton && (
						<Button
							style={{ marginLeft: "8px" }}
							type="link"
							size="small"
							onClick={joinTeam}
						>
							Join
						</Button>
					)}
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "8px 0",
						gap: "16px",
					}}
				>
					{team.members.map((member: MemberProps) => (
						<UserItem
							profile={member.user.profile}
							url={member.user.avatar?.url}
							language={member.language}
							skills={member.user.skills}
						/>
					))}
				</div>
			</div>
			<div style={{ flex: 1, margin: 0 }}>
				{/* {pool.language && (
								<TextEllipsis>
									<IconLanguage /> {pool.language}
								</TextEllipsis>
							)} */}
				<div className="horizontal-center">
					<span>
						Joined: {team.members.length} / {team.num_members}
					</span>{" "}
				</div>
				{team.description && (
					<>
						<span>Join requirement:</span>{" "}
						<p style={{ color: "GrayText", fontSize: 12 }}>
							{team.description}
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default TeamCard;
