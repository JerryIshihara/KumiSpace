import React, { useEffect, useMemo, useState } from "react";
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
} from "api/kaggle";
import { TextEllipsis, UserItem, Messages } from "components";
import { MemberProps } from "../card/card.team";
import { useAuth } from "context/auth";
import JoinPoolForm from "./joinPoolForm";
import CreateTeam from "./createTeam";
import { useUser } from "context/user";
import { stringify } from "querystring";

interface Props {
	url?: string;
	img?: string;
	competitionName: string;
}

const MyTeam: React.FC<Props> = props => {
	const auth = useAuth();
	const userContext = useUser();
	const history = useHistory();
	const [content, setContent] = useState<any>();
	const [teamName, setTeamName] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [language, setLanguage] = useState<string>();

	useEffect(() => {
		if (props.competitionName && auth.token) {
			get_my_team(auth.token, props.competitionName)
				.then(res => {
					console.log(res.data);
					setContent(res.data);
					if (res.data.pool) {
						setLanguage(res.data.pool.language);
						setDescription(res.data.pool.description);
					} else if (res.data.team) {
						setTeamName(res.data.team.name);
					}
				})
				.catch(e => {
					console.warn(e.response);
					if (e.response.status) {
						auth
							.refresh_token()
							.then(res => {
								auth.storeToken(res.data.token);
								get_my_team(res.data.token, props.competitionName)
									.then(res => {
										console.log(res.data);
										setContent(res.data);
										if (res.data.pool || res.data.join_request) {
											var data =
												res.data.pool || res.data.join_request?.my_request;
											setLanguage(data.language);
											setDescription(data.description);
										} else if (res.data.team) {
											setTeamName(res.data.team.name);
										}
									})
									.catch(e => {
										console.warn(e.response);
									});
							})
							.catch(e => {
								auth.logout();
							});
					}
				});
		}
	}, [props.competitionName, auth.token]);

	type ContentType = "no-content" | "pool" | "join_request" | "team";
	let contentType: ContentType = useMemo(() => {
		if (content?.pool) {
			return "pool";
		} else if (content?.team) {
			return "team";
		} else if (content?.join_request) {
			return "join_request";
		}
		return "no-content";
	}, [content]);

	const leave_competition = () => {
		leave_team(auth.token, props.competitionName)
			.then(res => {
				setContent(undefined);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const isLeader = useMemo(() => {
		if (!content?.team) {
			return false;
		}
		const leader = content?.team.members.find(
			(member: MemberProps) => member.role === "leader"
		);
		return leader.user.public_id === userContext.user.public_id;
	}, [content, userContext.user]);

	const make_decision = (
		group_pid: string,
		requester_pid: string,
		accept: boolean
	) => {
		make_join_request_decision(auth.token, group_pid, requester_pid, accept)
			.then(res => {
				console.log(res);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	return (
		<div className="strm-page-card my-team-container">
			{contentType === "team" && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{isLeader ? (
							<Input.Group compact>
								<Input
									style={{ width: "calc(50%)", fontWeight: "bold" }}
									value={teamName}
									disabled={!isLeader}
									onChange={e => {
										setTeamName(e.target.value);
									}}
								/>
								<Button type="primary" disabled={!isLeader}>
									Save
								</Button>
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
						<Button style={{ marginLeft: "auto" }} onClick={leave_competition}>
							Leave the team
						</Button>
					</div>

					<Divider />
					<h1>Team members</h1>
					<div className="my-team-members">
						{content?.team.members.map((member: MemberProps) => (
							<UserItem
								profile={member.user.profile}
								url={member.user.avatar?.url}
								language={member.language}
								skills={member.user.skills}
								role={member.role}
							/>
						))}
					</div>
					{content?.team.join_requests.length > 0 && (
						<>
							<Divider />
							<h1>Join requests</h1>
							<div className="my-team-members">
								{content?.team.join_requests.map((member: any) => (
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
													{isLeader && member.status === "pending" && (
														<div
															className="horizontal-center"
															style={{ marginLeft: "auto", gap: "8px" }}
														>
															<Button
																size="small"
																// type="link"
																onClick={() => {
																	make_decision(
																		content?.team?.public_id,
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
																		content?.team?.public_id,
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
					<Divider />

					<Messages />
				</>
			)}
			{contentType === "pool" && (
				<>
					<h2>My Pool</h2>
					<Divider />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							// alignItems: "center",
						}}
					>
						<h4>Description</h4>
						<Input.TextArea
							value={description}
							onChange={e => {
								setDescription(e.target.value);
							}}
						/>
						<h4 style={{ marginTop: "16px" }}>Language</h4>
						<Input
							value={language}
							onChange={e => {
								setLanguage(e.target.value);
							}}
						/>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "16px",
								marginTop: "32px",
							}}
						>
							<Button
								type="primary"
								disabled={
									language === content.pool.language &&
									description === content.pool.description
								}
								onClick={() => {
									edit_pool(
										auth.token,
										props.competitionName,
										description,
										language
									)
										.then(res => {
											console.log(res.data);
											setContent({ pool: { description, language } });
											message.success("Successfully updated the pool!");
										})
										.catch(e => {
											console.warn(e.response);
											message.error("Pool update failed!");
										});
								}}
							>
								Save
							</Button>
							<Button onClick={leave_competition}>Leave the pool</Button>
						</div>
					</div>
				</>
			)}
			{contentType === "join_request" && (
				<>
					<h2>My Join Request</h2>
					<Divider />
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
									style={{
										fontSize: 18,
										fontWeight: "bold",
										width: "fit-content",
									}}
								>
									{content.join_request.group.name}
								</TextEllipsis>
								<span
									style={{
										marginLeft: "auto",
										marginRight: "8px",
										color: "GrayText",
									}}
								>
									Updated on:{" "}
									{content.join_request.my_request.updated_on.split("T")[0] +
										" " +
										content.join_request.my_request.updated_on
											.split("T")[1]
											.split(".")[0]}
								</span>
								<Tag
																		style={{
																			marginRight: "8px",
																		}}
									color={
										content.join_request.my_request.status === "accepted"
											? "green"
											: content.join_request.my_request.status === "rejected"
											? "red"
											: undefined
									}
								>
									{content.join_request.my_request.status}
								</Tag>
								<Button type="text" onClick={leave_competition} icon={<IconDelete />}/>
							</div>
						</div>
					</div>
					{content.join_request.my_request.status === "pending" && (
						<>
							<Divider />
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									// alignItems: "center",
								}}
							>
								<h4>Description</h4>
								<Input.TextArea
									value={description}
									onChange={e => {
										setDescription(e.target.value);
									}}
								/>
								<h4 style={{ marginTop: "16px" }}>Language</h4>
								<Input
									value={language}
									onChange={e => {
										setLanguage(e.target.value);
									}}
								/>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "16px",
										marginTop: "32px",
									}}
								>
									<Button
										type="primary"
										disabled={
											language === content.join_request.language &&
											description === content.join_request.description
										}
										onClick={() => {
											edit_pool(
												auth.token,
												props.competitionName,
												description,
												language
											)
												.then(res => {
													console.log(res.data);
													setContent({ pool: { description, language } });
													message.success("Successfully updated the request!");
												})
												.catch(e => {
													console.warn(e.response);
													message.error("Request update failed!");
												});
										}}
									>
										Save
									</Button>
									<Button onClick={leave_competition}>Withdraw request</Button>
								</div>
							</div>
						</>
					)}
				</>
			)}
			{contentType === "no-content" && (
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
