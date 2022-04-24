import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
	get_my_team,
	edit_pool,
	leave_team,
	make_join_request_decision,
	make_invite_request_decision,
} from "api/kaggle";
import { useAuth } from "context/auth";
import { useUser } from "context/user";
import { MemberProps } from "types/kaggle";

import { TextEllipsis, UserItem, Messages } from "components";
import JoinPoolForm from "./joinPoolForm";
import CreateTeam from "./createTeam";
import { useCompetition } from "context/kaggleCompetition";
import MyPool from "./myPool";
import { RiQuestionAnswerLine } from "react-icons/ri";
import MyJoinRequest from "./joinRequest";
import Team from "./team";

interface Props {
	url?: string;
	img?: string;
	competitionName: string;
}

const MyTeam: React.FC<Props> = props => {
	const auth = useAuth();
	const userContext = useUser();
	const compContext = useCompetition();
	const history = useHistory();
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
			{compContext.mySectionType === "team" && (
				<Team />
			)}
			{compContext.mySectionType === "pool" && compContext.myTeam?.pool && (
				<MyPool
					pool={compContext.myTeam?.pool}
					invite_requests={compContext.myTeam?.invite_requests || []}
				/>
			)}
			{compContext.mySectionType === "join_requests" &&
				compContext.myTeam?.join_requests && (
					<MyJoinRequest myJoinRequest={compContext.myTeam?.join_requests} />
				)}
			{compContext.mySectionType === "no-content" && (
				<>
					{" "}
					<div className="vertical-center">
						<Button
							type="primary"
							style={{ fontWeight: 600 }}
							onClick={() => {
								history.push({
									pathname: window.location.pathname + "?tab=my-team&form=pool",
								});
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
								history.push({
									pathname: window.location.pathname + "?tab=my-team&form=team",
								});
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
									history.goBack();
								}}
							/>
							<CreateTeam competitionName={props.competitionName} />
						</>
					)}
				</>
			)}
		</div>
	);
};

export default MyTeam;
