import React, { useEffect, useState } from "react";
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
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";

import { get_my_team, edit_pool } from "api/kaggle";
import { TextEllipsis, UserItem, Messages } from "components";
import { Bullet } from "utils/text.constant";
import { useAuth } from "context/auth";
import JoinPoolForm from "./joinPoolForm";
import CreateTeam from "./createTeam";

interface Props {
	url?: string;
	img?: string;
	competitionName: string;
}

const MyTeam: React.FC<Props> = props => {
	const auth = useAuth();
	const history = useHistory();
	const [content, setContent] = useState<any>();
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
					}
				})
				.catch(e => {
					console.warn(e);
				});
		}
	}, [props.competitionName, auth.token]);
	return (
		<div className="strm-page-card my-team-container">
			{content?.team && (
				<>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Input.Group compact>
							<Input
								style={{ width: "calc(50%)", fontWeight: "bold" }}
								defaultValue="Team name"
							/>
							<Button type="primary">Save</Button>
						</Input.Group>
						{/* <span
					style={{ fontSize: 20, fontWeight: "bold", width: "fit-content" }}
				>
					({numMember}/5)
				</span> */}
						<Button style={{ marginLeft: "auto" }}>Leave the team</Button>
						<Button
							type="primary"
							style={{ fontWeight: 600, marginLeft: "auto", color: "white" }}
							// onClick={() => {
							// 	history.push(
							// 		`/competitions/${competitionName}/new?type=team`
							// 	);
							// }}
							// href={`/competitions/${competitionName}/team/new`}
						>
							Create a team
						</Button>
					</div>
					<Divider />
					<div className="my-team-members">
						{[...Array(2)].fill("").map(_ => (
							<UserItem profile={{ username: "JerryIshihara" }} />
						))}
					</div>
					<Divider />
					<Messages />
				</>
			)}
			{content?.pool && (
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
											console.warn(e);
											message.error("Pool update failed!");
										});
								}}
							>
								Save
							</Button>
							<Button>Leave the pool</Button>
						</div>
					</div>
				</>
			)}
			{!content?.pool && !content?.team && (
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
							<CreateTeam />
						</>
					)}
				</>
			)}
		</div>
	);
};

export default MyTeam;
