import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Avatar, message } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import {
	Tag,
	Button,
	Input as ArcoInput,
	Message,
} from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";

import { join_pool } from "api/kaggle/pool";
import FormItem from "components/FormItem";
import "./style.less";
import { useAuth } from "context/auth";
import { useCompetition } from "context/kaggleCompetition";

interface Props {
	competitionName: string;
	onCancel: () => void;
}

const JoinPoolForm: React.FC<Props> = ({
	competitionName,
	onCancel,
}: Props) => {
	const auth = useAuth();
	const history = useHistory();
	const compContext = useCompetition()
	const params = new URLSearchParams(window.location.search);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [description, setDescription] = useState<string>();
	const [language, setLanguage] = useState<string>();
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
		auth.authorizedAPI(
			(token: string) =>
				join_pool(token, competitionName, description, language),
			(res: any) => {
				compContext.fetch_my_team && compContext.fetch_my_team()
				compContext.fetch_pool && compContext.fetch_pool()
				message.success("You have joined the competition");
				setConfirmLoading(false);
			},
			() => {},
			() => {
				history.goBack();
			},
			() => {
				history.push("/auth/sign-in");
			}
		);
	};

	return (
		<>
			<Modal
				// title="Add skill"
				visible={params.get("form") === "pool"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={onCancel}
			>
				<h1>Join the pool</h1>
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

export default JoinPoolForm;
