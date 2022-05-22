import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Tabs, Button, Space, Select, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { create_team } from "api/kaggle/group";
import "./style.less";
import { useAuth } from "context/auth";
import { useCompetition } from "context/kaggleCompetition";

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
	const navigate = useNavigate();
	const auth = useAuth();
	const compContext = useCompetition();
	const params = new URLSearchParams(window.location.search);
	const [name, setName] = useState<string>();
	const [numMembers, setNumMembers] = useState<number>(5);
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
		auth.authorizedAPI(
			(token: string) =>
				create_team(
					token,
					props.competitionName,
					name,
					numMembers,
					language,
					description
				),
			res => {
				compContext.fetch_my_team && compContext.fetch_my_team();
				compContext.fetch_teams && compContext.fetch_teams();
				setConfirmLoading(false);
				message.success(`Team ${name} created!`);
			},
			e => {
				console.warn(e.response);
				message.error(
					`You already created/joined a team under competition ${props.competitionName}`
				);
			},
			() => {
				navigate(-1);
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

				{/* <InputItem label="Team size">
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
				</InputItem> */}
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
