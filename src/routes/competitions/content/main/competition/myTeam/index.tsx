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
			if (compContext.myTeam.team) {
				setTeamName(compContext.myTeam.team.name);
			}
		}
	}, [compContext.mySectionType, compContext.myTeam]);

	const make_decision = useCallback(
		(requester_pid: string, accept: boolean) => {
			if (compContext.myTeam?.team?.public_id) {
				make_join_request_decision(
					auth.token,
					compContext.myTeam.team.public_id,
					requester_pid,
					accept
				)
					.then(res => {
						console.log(res);
					})
					.catch(e => {
						console.warn(e.response);
					});
			}
		},
		[auth.token, compContext.myTeam?.team?.public_id]
	);

	return (
		<div className="strm-page-card my-team-container">
			{compContext.mySectionType === "team" && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{compContext.isLeader ? (
							<Input.Group compact>
								<Input
									style={{ width: "calc(50%)", fontWeight: "bold" }}
									value={teamName}
									onChange={e => {
										setTeamName(e.target.value);
									}}
								/>
								<Button type="primary">Save</Button>
							</Input.Group>
						) : (
							<span style={{ fontSize: 25, fontWeight: "bold" }}>
								{teamName}
							</span>
						)}
						{/* <span
					style={{ fontSize: 20, fontWeight: "bold", width: "fit-content" }}
				>
					({numMember}/5)
				</span> */}
						<Button
							style={{ marginLeft: "auto" }}
							onClick={compContext.leave_competition}
						>
							Leave the team
						</Button>
					</div>

					<Divider />
					<h1>Team members</h1>
					<div className="my-team-members">
						{compContext.myTeam?.team?.members.map((member: MemberProps) => (
							<UserItem
								profile={member.user.profile}
								url={member.user.avatar?.url}
								language={member.language}
								skills={member.user.skills}
								role={member.role}
							/>
						))}
					</div>
					{compContext.myTeam?.team?.join_requests &&
						compContext.myTeam?.team?.join_requests?.length > 0 && (
							<>
								<Divider />
								<h1>Join requests</h1>
								<div className="my-team-members">
									{compContext.myTeam?.team.join_requests.map((member: any) => (
										<div style={{ display: "flex", flexDirection: "row" }}>
											<UserItem
												style={{ flex: 1 }}
												profile={member.user.profile}
												url={member.user.avatar?.url}
												language={member.language}
												skills={member.user.skills}
												role={member.role}
											/>
											<div style={{ flex: 1 }}>
												{
													<div className="horizontal-center">
														<Tag
															color={
																member.status === "accepted"
																	? "green"
																	: member.status === "rejected"
																	? "red"
																	: undefined
															}
														>
															{member.status}
														</Tag>
														{compContext.isLeader &&
															member.status === "pending" &&
															compContext.myTeam?.team?.public_id && (
																<div
																	className="horizontal-center"
																	style={{ marginLeft: "auto", gap: "8px" }}
																>
																	<Button
																		size="small"
																		// type="link"
																		onClick={() => {
																			make_decision(
																				member.user.public_id,
																				false
																			);
																		}}
																	>
																		Reject
																	</Button>
																	<Button
																		size="small"
																		type="primary"
																		onClick={() => {
																			make_decision(
																				member.user.public_id,
																				true
																			);
																		}}
																	>
																		Accept
																	</Button>
																</div>
															)}
													</div>
												}

												{member.language && (
													<TextEllipsis>
														<IconLanguage /> {member.language}
													</TextEllipsis>
												)}
												{member.description && (
													<p style={{ color: "GrayText", fontSize: 12 }}>
														{member.description}
													</p>
												)}
											</div>
										</div>
									))}
								</div>
							</>
						)}
					{compContext.myTeam?.team?.invite_requests &&
						compContext.myTeam?.team.invite_requests.length > 0 && (
							<>
								<Divider />
								<h1>Invited</h1>
								<div className="my-team-members">
									{compContext.myTeam?.team.invite_requests.map(
										(member: any) => (
											<div style={{ display: "flex", flexDirection: "row" }}>
												<UserItem
													style={{ flex: 1 }}
													profile={member.user.profile}
													url={member.user.avatar?.url}
													language={member.language}
													skills={member.user.skills}
													role={member.role}
												/>
												<div style={{ flex: 1 }}>
													{
														<div className="horizontal-center">
															<Tag
																color={
																	member.status === "accepted"
																		? "green"
																		: member.status === "rejected"
																		? "red"
																		: undefined
																}
															>
																{member.status}
															</Tag>
															{compContext.isLeader &&
																member.status === "pending" && (
																	<Button
																		size="small"
																		style={{ marginLeft: "auto" }}
																		onClick={() => {}}
																	>
																		Withdraw
																	</Button>
																)}
														</div>
													}

													{member.language && (
														<TextEllipsis>
															<IconLanguage /> {member.language}
														</TextEllipsis>
													)}
													{member.description && (
														<p style={{ color: "GrayText", fontSize: 12 }}>
															{member.description}
														</p>
													)}
												</div>
											</div>
										)
									)}
								</div>
							</>
						)}
					<Divider />

					<Messages />
				</>
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
