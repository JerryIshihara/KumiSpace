import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { message, Tabs, Button, Space, Select, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { create_team } from "api/kaggle";
import "./style.less";
import { useAuth } from "context/auth";

interface InputItemProps {
	label: string;
	style?: React.CSSProperties;
	className?: string;
}
const InputItem: React.FC<InputItemProps> = props => {
	return (
		<div className={props.className} style={props.style}>
			<p style={{ marginBottom: 2 }}>{props.label}</p> {props.children}
		</div>
	);
};

interface Props {
	competitionName: string;
}
const CreatePage: React.FC<Props> = (props: Props) => {
	const history = useHistory();
	const auth = useAuth();
	const params = new URLSearchParams(window.location.search);
	const [name, setName] = useState<string>();
	const [numMembers, setNumMembers] = useState<number>();
	const [language, setLanguage] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const onFinish = (values: any) => {
		console.log(values);
	};
	const handleOk = () => {
		setStatus(undefined);
		if (!name) {
			message.error("Please enter a team name.");
			return;
		}
		if (!numMembers) {
			message.error("Please choose a team size.");
			return;
		}
		setConfirmLoading(true);
		create_team(
			auth.token,
			props.competitionName,
			name,
			numMembers,
			language,
			description
		)
			.then(res => {
				setTimeout(() => {
					setConfirmLoading(false);

					setTimeout(() => {
						history.goBack();
					}, 1000);
				}, 1000);
			})
			.catch(e => {
				if (e.response.status === 409) {
					message.error(
						`You already created/joined a team under competition ${props.competitionName}`
					);
				}
				console.warn(e.response);
			})
			.finally(() => {
				setConfirmLoading(false);
			});
	};

	const handleCancel = () => {
		setStatus(undefined);
		history.goBack();
	};
	return (
		<Modal
			// title="Add skill"
			visible={params.get("form") === "team"}
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
		>
			<h1>Create a new team</h1>
			<Space direction="vertical" size={15} style={{ width: "100%" }}>
				<InputItem label="Team name">
					<Input
						required
						value={name}
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</InputItem>

				<InputItem label="Team size">
					<Select
						style={{ width: "200px" }}
						onChange={value => {
							setNumMembers(value);
						}}
					>
						{[
							...Array(5)
								.fill("")
								.map((item, index) => (
									<Select.Option value={index + 1}>{index + 1}</Select.Option>
								)),
						]}
					</Select>
				</InputItem>
				<InputItem label="Language (optional)">
					<Input
						required
						value={language}
						onChange={e => {
							setLanguage(e.target.value);
						}}
					/>
				</InputItem>
				<InputItem label="Description / Join requirement (optional)">
					<Input.TextArea
						value={description}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>
				</InputItem>
				{/* <InputItem label="Logo">
						<ImageUploader />
					</InputItem> */}
			</Space>
		</Modal>
	);
};

export default CreatePage;