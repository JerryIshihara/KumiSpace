import React, { useState } from "react";
import { Divider, Input, Button } from "antd";
import { Tag } from "@arco-design/web-react";

import { InviteRequestProps, MemberProps, PoolProps } from "types/kaggle";
import { useCompetition } from "context/kaggleCompetition";
import { TextEllipsis, UserItem } from "components";

interface Props {
	pool: Partial<PoolProps>;
	invite_requests: Array<InviteRequestProps>;
}

const MyPool: React.FC<Props> = React.memo(
	({ pool, invite_requests }: Props) => {
		const compContext = useCompetition();
		const [description, setDescription] = useState<string>();
		const [language, setLanguage] = useState<string>();
		const decide_invite_request = (group_pid: string, accept: boolean) => {
			// make_invite_request_decision(auth.token, group_pid, accept)
			// 	.then(res => {
			// 		console.log(res);
			// 	})
			// 	.catch(e => {
			// 		console.warn(e.response);
			// 	});
        };
        
        React.useEffect(() => {
          console.log("rendering myPool");
          
        }, [])
        

		return (
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
								language === pool.language && description === pool.description
							}
							onClick={() => {
								compContext.edit_my_pool &&
									compContext.edit_my_pool(description, language);
							}}
						>
							Save
						</Button>
						<Button onClick={compContext.leave_competition}>
							Leave the pool
						</Button>
					</div>
				</div>
				{compContext?.myTeam?.invite_requests &&
					compContext.myTeam.invite_requests.length > 0 && (
						<>
							<Divider />
							<h1>Inviters</h1>
							<div className="my-team-members">
								{invite_requests.map(({ invite_request, group }: any) => (
									<div style={{ display: "flex", flexDirection: "row" }}>
										<div
											style={{
												flex: 1,
												display: "flex",
												flexDirection: "column",
												gap: "4px",
											}}
										>
											<TextEllipsis
												style={{ fontSize: 20, fontWeight: "bold" }}
											>
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
																: undefined
														}
													>
														{invite_request.status}
													</Tag>
													{invite_request.status === "pending" && (
														<div
															className="horizontal-center"
															style={{ marginLeft: "auto", gap: "8px" }}
														>
															<Button
																size="small"
																// type="link"
																onClick={() => {
																	decide_invite_request(group.public_id, false);
																}}
															>
																Reject
															</Button>
															<Button
																size="small"
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
								))}
							</div>
						</>
					)}
			</>
		);
	}
);

export default MyPool;
