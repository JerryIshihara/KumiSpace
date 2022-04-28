import React from "react";
import { Divider, Button, message } from "antd";
import { Tag } from "@arco-design/web-react";
import { IconLanguage } from "@arco-design/web-react/icon";

import { InviteRequestProps, MemberProps, TeamProps } from "types/kaggle";
import { TextEllipsis, UserItem } from "components";
import { useCompetition } from "context/kaggleCompetition";
import { make_invite_request_decision } from "api/kaggle/group";
import { useAuth } from "context/auth";

interface Props {
	invites:
		| Array<InviteRequestProps>
		| Array<{ invite_request: InviteRequestProps; group: TeamProps }>;
	admin: boolean;
}
const InviteRequests: React.FC<Props> = React.memo(
    ({ invites, admin }: Props) => {
        const auth = useAuth()
		const compContext = useCompetition();
		const decide_invite_request = (group_pid: string, accept: boolean) => {
			auth.authorizedAPI(
				(token: string) => make_invite_request_decision(token, group_pid, accept),
				(res) => {
					compContext.fetch_my_team && compContext.fetch_my_team();
					message.info(`You have ${accept ? "accepted" : "rejected"} the invitation`)
				}
			)
		};

		return invites.length > 0 ? (
			<>
				<h1>{admin ? "Inviters" : "Invited"}</h1>
				<div className="my-team-members">
					{admin
						? invites.map(({ invite_request, group }: any) => (
							<div
							className="strm-card-team-container"
								style={{ display: "flex", flexDirection: "row" }}>
									<div
										style={{
											flex: 1,
											display: "flex",
											flexDirection: "column",
											gap: "4px",
										}}
									>
										<TextEllipsis style={{ fontSize: 20, fontWeight: "bold", marginBottom: '8px' }}>
											{group.name}
										</TextEllipsis>
										{group.members.map((member: MemberProps) => (
											<UserItem
												profile={member.user.profile}
												url={member.user.avatar?.url}
												language={member.language}
												skills={member.user.skills}
												role={member.role}
											/>
										))}
									</div>
									<div style={{ flex: 1 }}>
										{
											<div className="horizontal-center">
												<Tag
													color={
														invite_request.status === "accepted"
															? "green"
															: invite_request.status === "rejected"
															? "red"
															: "gold"
													}
												>
													{invite_request.status}
												</Tag>
												{invite_request.status === "pending" && admin && (
													<div
														className="horizontal-center"
														style={{ marginLeft: "auto", gap: "8px" }}
													>
														<Button
															// type="link"
															onClick={() => {
																decide_invite_request(group.public_id, false);
															}}
														>
															Reject
														</Button>
														<Button
															type="primary"
															onClick={() => {
																decide_invite_request(group.public_id, true);
															}}
														>
															Accept
														</Button>
													</div>
												)}
											</div>
										}
										{invite_request.description && (
											<p style={{ color: "GrayText", fontSize: 12 }}>
												{invite_request.description}
											</p>
										)}
									</div>
								</div>
						  ))
						: invites.map((invite: any) => (
							invite.status === "pending" && <div style={{ display: "flex", flexDirection: "row" }}>
									<UserItem
										style={{ flex: 1 }}
										profile={invite.user.profile}
										url={invite.user.avatar?.url}
										language={invite.language}
										skills={invite.user.skills}
										role={invite.role}
									/>
									<div style={{ flex: 1 }}>
										{
											<div className="horizontal-center">
												<Tag
													color={
														invite.status === "accepted"
															? "green"
															: invite.status === "rejected"
															? "red"
															: "gold"
													}
												>
													{invite.status}
												</Tag>
												{compContext.isLeader && invite.status === "pending" && (
													<Button
														style={{ marginLeft: "auto" }}
														onClick={() => {}}
													>
														Withdraw
													</Button>
												)}
											</div>
										}

										{invite.language && (
											<TextEllipsis>
												<IconLanguage /> {invite.language}
											</TextEllipsis>
										)}
										{invite.description && (
											<p style={{ color: "GrayText", fontSize: 12 }}>
												{invite.description}
											</p>
										)}
									</div>
								</div>
						  ))}
				</div>
			</>
		) : (
			<></>
		);
	}
);

export default InviteRequests;
