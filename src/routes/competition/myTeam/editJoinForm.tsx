import React, { useState, useEffect } from "react";
import { Modal, Select, Input, message } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
	Tag,
	Button,
	Input as ArcoInput,
	Message,
} from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";

import { edit_join_team_request } from "api/kaggle/group";
import FormItem from "components/FormItem";
import "./style.less";
import { useAuth } from "context/auth";
import { useCompetition } from "context/kaggleCompetition";

interface Props {
	pid: string;
}

const EditJoinForm: React.FC<Props> = (props: Props) => {
	const auth = useAuth();
	const compContext = useCompetition();
	const navigate = useNavigate();
	const params = new URLSearchParams(window.location.search);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [description, setDescription] = useState<string>();
	const [language, setLanguage] = useState<string>();
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const [errMsg, setErrMsg] = useState<string>();

	useEffect(() => {
		setLanguage(compContext.myTeam?.join_requests?.my_request?.language);
		setDescription(compContext.myTeam?.join_requests?.my_request?.description);
	}, [compContext.myTeam?.join_requests?.my_request]);

	const handleOk = () => {
		// setStatus(undefined);
		// if (!username) {
		// 	setStatus({ code: "error", msg: "empty fields" });
		// 	return;
		// }
		setConfirmLoading(true);
		auth.authorizedAPI(
			token => edit_join_team_request(token, props.pid, description, language),
			res => {
				compContext.fetch_my_team && compContext.fetch_my_team();
				setConfirmLoading(false);
				message.success("Join request updated");
			},
			e => {
				console.warn(e.response);
			},
			() => {
				setConfirmLoading(false);
				navigate(-1);
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
				visible={params.get("form") === "edit-join-request"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<h1>Edit join team request</h1>
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
						</div>
					</FormItem>
				</div>
			</Modal>
		</>
	);
};

export default EditJoinForm;
