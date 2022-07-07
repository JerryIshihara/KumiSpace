import React, { useState, useEffect, useCallback } from "react";
import { Input, Divider, Button, message } from "antd";
import { Tag } from "@arco-design/web-react";
import { IconLanguage } from "@arco-design/web-react/icon";

import { useCompetition } from "context/kaggleCompetition";
import { MemberProps } from "types/kaggle";
import { UserItem, TextEllipsis, Messages } from "components";
import { edit_team, make_join_request_decision } from "api/kaggle/group";
import { useAuth } from "context/auth";
import InviteRequests from "./inviteRequests";

const Team: React.FC = () => {
	const auth = useAuth();
	const compContext = useCompetition();
	const [teamName, setTeamName] = useState<string>();

	useEffect(() => {
		if (compContext.myTeam?.team) {
			setTeamName(compContext.myTeam.team.name);
		}
	}, [compContext.mySectionType, compContext.myTeam]);

	const make_decision = useCallback(
		(requester_pid: string, accept: boolean) => {
			if (compContext.myTeam?.team?.public_id) {
				let pid = compContext.myTeam?.team?.public_id;
				auth.authorizedAPI(
					(token: string) =>
						make_join_request_decision(token, pid, requester_pid, accept),
					res => {
						compContext.fetch_my_team && compContext.fetch_my_team();
						message.success(
							`You have ${accept ? "accepted" : "rejected"} the join request`
						);
					}
				);
			}
		},
		[auth.token, compContext.myTeam?.team?.public_id]
	);

	const edit_group_setting = () => {
		if (compContext.competitionName && teamName) {
			var compName: string = compContext.competitionName;
			auth.authorizedAPI((token: string) =>
				edit_team(
					token,
					compName,
					teamName,
					compContext.myTeam?.team?.num_members || 5,
					compContext.myTeam?.team?.description
				),
				(res) => {
					message.success("You have updated the group setting")
				}
			);
		}
	};

	return (
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
						<Button
							disabled={!teamName || teamName === ""}
							type="primary"
							onClick={edit_group_setting}
						>
							Save
						</Button>
					</Input.Group>
				) : (
					<span style={{ fontSize: 25, fontWeight: "bold" }}>{teamName}</span>
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
				compContext.myTeam?.team?.join_requests?.filter(
					j => j.status === "pending"
				).length > 0 && (
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
															: "gold"
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
																	make_decision(member.user.public_id, false);
																}}
															>
																Reject
															</Button>
															<Button
																size="small"
																type="primary"
																onClick={() => {
																	make_decision(member.user.public_id, true);
																}}
															>
																Accept
															</Button>
														</div>
													)}
											</div>
										}

										{/* {member.language && (
											<TextEllipsis>
												<IconLanguage /> {member.language}
											</TextEllipsis>
										)} */}
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
			{(
				compContext.myTeam?.team?.invite_requests?.filter(
					i => i.status === "pending"
				) || []
			).length > 0 && (
				<InviteRequests
					admin={false}
					invites={compContext.myTeam?.team?.invite_requests || []}
				/>
			)}
			{/* {compContext.myTeam?.team?.invite_requests && (
                
							<>
								<Divider />
								<h1>Invited</h1>
								<div className="my-team-members">
									{
								</div>
							</>
						)} */}
			<Divider />

			<Messages />
		</>
	);
};

export default Team;
