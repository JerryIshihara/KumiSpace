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


import { get_my_team, edit_pool, leave_team } from "api/kaggle";
import { TextEllipsis, UserItem, Messages } from "components";
import {MemberProps} from '../card/card.team'
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
	const [teamName, setTeamName] = useState<string>()
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
					else if (res.data.team) {
						setTeamName(res.data.team.name)
					}
				})
				.catch(e => {
					console.warn(e.response);
				});
		}
	}, [props.competitionName, auth.token]);

	const contentType = useMemo(() => {
		if (!content?.pool && !content?.team) {
			return "no-content";
		} else if (content?.pool) {
			return "pool";
		} else if (content?.team) {
			return "team";
		}
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
						<Input.Group compact>
							<Input
								style={{ width: "calc(50%)", fontWeight: "bold" }}
								value={teamName}
								onChange={e => { setTeamName(e.target.value) }}
							/>
							<Button type="primary">Save</Button>
						</Input.Group>
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
