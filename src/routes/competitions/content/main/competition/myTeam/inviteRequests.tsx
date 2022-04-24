import React from "react";
import { Divider, Button } from "antd";
import { Tag } from "@arco-design/web-react";

import { InviteRequestProps, MemberProps } from "types/kaggle";
import { TextEllipsis, UserItem } from "components";

interface Props {
    invites: Array<InviteRequestProps>;
    admin: boolean,
}
const InviteRequests: React.FC<Props> = React.memo(({ invites, admin }: Props) => {
	const decide_invite_request = (group_pid: string, accept: boolean) => {
		// make_invite_request_decision(auth.token, group_pid, accept)
		// 	.then(res => {
		// 		console.log(res);
		// 	})
		// 	.catch(e => {
		// 		console.warn(e.response);
		// 	});
	};

	return invites.length > 0 ? (
		<>
			<Divider />
			<h1>Inviters</h1>
			<div className="my-team-members">
				{invites.map(({ invite_request, group }: any) => (
					<div style={{ display: "flex", flexDirection: "row" }}>
						<div
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								gap: "4px",
							}}
						>
							<TextEllipsis style={{ fontSize: 20, fontWeight: "bold" }}>
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
									{invite_request.status === "pending" && admin && (
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
	) : (
		<></>
	);
});

export default InviteRequests;
