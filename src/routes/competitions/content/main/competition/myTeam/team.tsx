import React, { useState, useEffect, useCallback } from "react";
import { Input, Divider, Button } from "antd";
import { Tag } from "@arco-design/web-react";
import { IconLanguage } from "@arco-design/web-react/icon";

import { useCompetition } from "context/kaggleCompetition";
import { MemberProps } from "types/kaggle";
import { UserItem, TextEllipsis, Messages } from "components";
import { make_join_request_decision } from "api/kaggle";
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
			<InviteRequests
				admin={false}
				invites={compContext.myTeam?.team?.invite_requests || []}
			/>
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
