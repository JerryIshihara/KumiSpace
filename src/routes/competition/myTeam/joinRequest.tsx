import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Divider, Button, message, Input } from "antd";
import {EditFilled} from "@ant-design/icons"
import { Tag } from "@arco-design/web-react";
import { IconDelete, IconLanguage } from "@arco-design/web-react/icon";

import { JoinRequestProps, TeamProps } from "types/kaggle";
import { useCompetition } from "context/kaggleCompetition";
import { TextEllipsis } from "components";
import { timePassed } from "utils/time";

import EditJoinForm from './editJoinForm';
import { useAuth } from "context/auth";
import { delete_join_team_request } from "api/kaggle/group";


interface Props {
	myJoinRequest: { my_request: JoinRequestProps; group: TeamProps };
}
const MyJoinRequest: React.FC<Props> = React.memo(
	({ myJoinRequest }: Props) => {
		const history = useHistory()
		const auth = useAuth()
		const compContext = useCompetition();
		const [description, setDescription] = useState<string>();
		const [language, setLanguage] = useState<string>();

		useEffect(() => {
			if (myJoinRequest) {
				setDescription(myJoinRequest.my_request.description);
				setLanguage(myJoinRequest.my_request.language);
			}
		}, [myJoinRequest]);
		const decide_invite_request = (group_pid: string, accept: boolean) => {
			// make_invite_request_decision(auth.token, group_pid, accept)
			// 	.then(res => {
			// 		console.log(res);
			// 	})
			// 	.catch(e => {
			// 		console.warn(e.response);
			// 	});
		};

		const withdrawJoinRequest = () => {
			auth.authorizedAPI(
				(token) => delete_join_team_request(token, myJoinRequest.group.public_id),
				(res) => {
					compContext.fetch_my_team && compContext.fetch_my_team()
					message.success("You have withdrawn the join request.")
				},
				(e) => {
					console.warn(e);
				},
				() => {

				},
				() => {
					history.push("/auth/sign-in");
				}
				)
		}

		return (
			<>
				{" "}
				<h1>My Join Request</h1>
				{/* <Divider /> */}
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
								marginBottom: "8px",
							}}
						>
							<TextEllipsis
								numLines={1}
								style={{
									fontSize: 18,
									fontWeight: "bold",
									width: "fit-content",
									lineHeight: 1
								}}
							>
								{myJoinRequest.group.name}
							</TextEllipsis>
							<Tag
								style={{
									marginLeft: "8px",
								}}
								color={
									myJoinRequest.my_request.status === "accepted"
										? "green"
										: myJoinRequest.my_request.status === "rejected"
										? "red"
										: "gold"
								}
							>
								{myJoinRequest.my_request.status}
							</Tag>
							<div style={{ marginLeft: "auto", gap: "8px" }} className="horizontal-center">
						
							{myJoinRequest.my_request.status === "pending" && <Button
						type="text"
						
						icon={<EditFilled />}
						onClick={() => {
							history.push(
								window.location.pathname + "?tab=my-team&form=edit-join-request"
							);
						}}
					>
						Edit
					</Button>}
								{myJoinRequest.my_request.status === "pending" ? <Button onClick={withdrawJoinRequest}>
									Withdraw request
								</Button> : <Button type="text" onClick={withdrawJoinRequest} icon={<IconDelete />} />}
								</div>
						</div>
						{myJoinRequest.my_request.status === "pending" && (
					<>
						{/* <Divider /> */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								// alignItems: "center",
							}}
								>

							<TextEllipsis style={{ marginBottom: "8px" }}>
								<IconLanguage /> <b>{language}</b>
							</TextEllipsis>
							<p style={{ fontSize: "small" }}>{description}</p>
						<p
							style={{
								fontSize: "small",
								color: "GrayText",
								lineHeight: 1,
								margin: 0,
							}}
						>
							{timePassed(myJoinRequest.my_request.updated_on)}
						</p>
						</div>
					</>
				)}
					</div>
				</div>
				<EditJoinForm pid={myJoinRequest.group.public_id}/>
			</>
		);
	}
);

export default MyJoinRequest;
