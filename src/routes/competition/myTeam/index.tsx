import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.less";
import { message, Button, Divider, Input } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import { IconLanguage, IconDelete } from "@arco-design/web-react/icon";
import { Tag, Message } from "@arco-design/web-react";

import {
	edit_pool,
} from "api/kaggle/pool";
import { useAuth } from "context/auth";
import { useUser } from "context/user";
import { MemberProps } from "types/kaggle";

import { TextEllipsis, UserItem, Messages } from "components";
import JoinPoolForm from "./joinPoolForm";
import CreateTeam from "./createTeam";
import { useCompetition } from "context/kaggleCompetition";
import MyPool from "./myPool";
import MyJoinRequest from "./joinRequest";
import Team from "./team";

interface Props {
	url?: string;
	img?: string;
	competitionName: string;
}

const MyTeam: React.FC<Props> = props => {
	const navigate = useNavigate()
	const auth = useAuth();
	const userContext = useUser();
	const compContext = useCompetition();
	const [teamName, setTeamName] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [language, setLanguage] = useState<string>();

	useEffect(() => {
		if (compContext.myTeam) {
			if (compContext.myTeam.pool || compContext.myTeam.join_requests) {
				var data =
					compContext.myTeam
						.pool; /* || compContext.myTeam?.join_requests[0].my_request; */
				setLanguage(data?.language);
				setDescription(data?.description);
			}
		}
	}, [compContext.mySectionType, compContext.myTeam]);

	return (
		<div className="strm-page-card my-team-container">
			{(compContext.mySectionType !== "team" && compContext.mySectionType !== "pool") && (
				<>
					{" "}
					<div className="vertical-center">
						<Button
							type="primary"
							style={{ fontWeight: 600 }}
							onClick={() => {
								navigate(window.location.pathname + "?tab=my-team&form=pool");
							}}
							// href={`/competitions/${competitionName}/team/new`}
						>
							Join the pool
						</Button>
						to be invited
						<Divider>or</Divider>
						<Button
							type="primary"
							style={{ fontWeight: 600 }}
							onClick={() => {
								navigate(window.location.pathname + "?tab=my-team&form=team");
							}}
						>
							Create a team
						</Button>
						to invite others
					</div>
					{props.competitionName && (
						<>
							{" "}
							<JoinPoolForm
								competitionName={props.competitionName}
								onCancel={() => {
									navigate(-1);
								}}
							/>
							<CreateTeam competitionName={props.competitionName} />
						</>
					)}
				</>
			)}
			{compContext.mySectionType === "team" && (
				<Team />
			)}
			{compContext.mySectionType === "pool" && compContext.myTeam?.pool && (
				<MyPool
					pool={compContext.myTeam?.pool}
					invite_requests={compContext.myTeam?.invite_requests || []}
				/>
			)}
			{compContext.myTeam?.join_requests && compContext.myTeam?.join_requests.my_request.status !== "accepted" && (
					<MyJoinRequest myJoinRequest={compContext.myTeam?.join_requests} />
				)}
		</div>
	);
};

export default MyTeam;
