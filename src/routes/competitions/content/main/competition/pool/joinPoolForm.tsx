import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Avatar } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import {
	Tag,
	Button,
	Input as ArcoInput,
	Message,
} from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";

import FormItem from "components/FormItem";
import "./style.less";

interface Props {
	onCancel: () => void;
}

const JoinPoolForm: React.FC<Props> = ({ onCancel }: Props) => {
	const params = new URLSearchParams(window.location.search);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [username, setUsername] = useState<string>();
	const [occupation, setOccupation] = useState<string>();
	const [organization, setOrganization] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [tags, setTags] = useState(["Tag 1", "Tag 2", "Tag 3"]);
	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const [errMsg, setErrMsg] = useState<string>();

	const addTag = () => {
		if (inputValue) {
			tags.push(inputValue);
			setTags(tags);
			setInputValue("");
		}
		setShowInput(false);
	};

	const removeTag = (removeTag: string) => {
		const newTags = tags.filter(tag => tag !== removeTag);
		setTags(newTags);
	};

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
		// setConfirmLoading(true);
		// userContext.updateProfile(
		// 	{
		// 		username,
		// 		occupation,
		// 		organization,
		// 		description,
		// 	},
		// 	onCancel
		// );
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
				visible={params.get("form") === "pool"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div className="main-page-form-container">
					<FormItem label="Description">
						<Input.TextArea
							placeholder="Briefly introduce your strength and expectation on this competition."
							value={description}
							maxLength={200}
							showCount
							onChange={e => setDescription(e.target.value)}
						/>
					</FormItem>
					<FormItem label="Language Preferences">
						<div style={{ display: "flex", alignItems: "flex-start" }}>
							{tags.map((tag, index) => {
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
							)}
						</div>
					</FormItem>
				</div>
			</Modal>
		</>
	);
};

export default JoinPoolForm;
