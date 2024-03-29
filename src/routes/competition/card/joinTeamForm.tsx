import React, { useState, useEffect } from "react";
import { Modal, Select, Input, message } from "antd";
import { UserOutlined, CameraOutlined }
	from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
	Tag,
	Button,
	Input as ArcoInput,
	Message,
} from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";

import { send_join_team_request } from "api/kaggle/group";
import FormItem from "components/FormItem";
import "./style.less";
import { useAuth } from "context/auth";
import { useCompetition } from "context/kaggleCompetition";

interface Props {
	team: {
		name: string;
		public_id: string;
	};
}

const JoinPoolForm: React.FC<Props> = (props: Props) => {
	const auth = useAuth();
	const compContext = useCompetition()
	const navigate = useNavigate();
	const params = new URLSearchParams(window.location.search);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [description, setDescription] = useState<string>();
	const [language, setLanguage] = useState<string>();
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const [errMsg, setErrMsg] = useState<string>();

	// useEffect(() => {
	// 	setUsername(userContext.user?.profile.username);
	// 	setOccupation(userContext.user?.profile.occupation);
	// 	setOrganization(userContext.user?.profile.organization);
	// 	setDescription(userContext.user?.profile.description);
	// 	return () => {
	// 		setConfirmLoading(false);
	// 	};
	// }, [userContext.user?.profile]);

	const handleOk = () => {
		// setStatus(undefined);
		// if (!username) {
		// 	setStatus({ code: "error", msg: "empty fields" });
		// 	return;
		// }
		setConfirmLoading(true);
		if (compContext.myTeam?.join_requests) {
			setConfirmLoading(false);
			navigate(-1);
			message.warning(
				"You can only send one team join request at a time."
			);
			return 
		}
		auth.authorizedAPI(
			token =>
				send_join_team_request(
					token,
					props.team.public_id,
					description,
					language
				),
			res => {
				compContext.fetch_my_team && compContext.fetch_my_team()
				navigate(-1);
				message.success("Join request sent to " + props.team.name);
			},
			e => {
				console.warn(e.response);
				if (e.response.status === 409) {
					navigate(-1);
					switch (e.response.data.status) {
						case "rejected":
							message.warn(`${props.team.name} has rejected your join request already`)
							break;
						default:
							message.warn(
								"You already created/joined the team: " + props.team.name
							);
							break;
					}
				}
			},
			() => {
				setConfirmLoading(false);
			},
			() => {
				navigate("/auth/sign-in");
			}
		);
	};

	const handleCancel = () => {
		setStatus(undefined);
		navigate(-1);
	};

	return (
		<>
			<Modal
				// title="Add skill"
				visible={params.get("form") === "join-team"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<h1>Join the team {props.team.name}</h1>
				<div className="main-page-form-container">
					<FormItem label="Description">
						<Input.TextArea
							placeholder="Briefly introduce your strength and expectation on this competition."
							value={description}
							maxLength={200}
							showCount
							onChange={e => {
								setDescription(e.target.value);
							}}
						/>
					</FormItem>
					<FormItem label="Language Preferences">
						<div style={{ display: "flex", alignItems: "flex-start" }}>
							<Input
								placeholder="English/Mandarin"
								value={language}
								onChange={e => {
									setLanguage(e.target.value);
								}}
							/>
							{/* {tags.map((tag, index) => {
								return (
									<Tag
										key={tag}
										closable
										onClose={() => removeTag(tag)}
										style={{ marginRight: 12 }}
									>
										{tag}
									</Tag>
								);
							})}
							{showInput ? (
								<ArcoInput
									autoFocus
									size="mini"
									value={inputValue}
									style={{ width: 84 }}
									onPressEnter={addTag}
									onBlur={addTag}
									onChange={setInputValue}
								/>
							) : (
								<Tag
									icon={<IconPlus />}
									style={{
										// width: 84,
										backgroundColor: "var(--color-fill-2)",
										border: "1px dashed var(--color-fill-3)",
										cursor: "pointer",
									}}
									onClick={() => setShowInput(true)}
								>
									Add Language
								</Tag>
							)} */}
						</div>
					</FormItem>
				</div>
			</Modal>
		</>
	);
};

export default JoinPoolForm;
