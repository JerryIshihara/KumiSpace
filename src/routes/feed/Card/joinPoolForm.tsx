import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Avatar } from "antd";
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

interface Props {
	competitionName: string;
	onCancel: () => void;
}

const JoinPoolForm: React.FC<Props> = ({
	competitionName,
	onCancel,
}: Props) => {
	const auth = useAuth();
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
		join_pool(auth.token, competitionName, description, language)
			.then(res => {
				console.log(res.data);
				onCancel();
			})
			.catch(e => {
				console.warn(e.response);
			})
			.finally(() => {
				setConfirmLoading(false);
			});
	};

	const handleCancel = () => {
		setStatus(undefined);
		console.log("Clicked cancel button");
		onCancel();
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
