import React, { useState, useEffect } from "react";
import { Modal, Select, Input, Avatar } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";

import FormItem from "components/FormItem";
import { ProfileProps } from ".";
import "./style.less";
import { useUser } from "context/user";

interface Props {
	onCancel: () => void;
}

const ProfileEditForm: React.FC<Props> = ({ onCancel }: Props) => {
	const userContext = useUser();
	const params = new URLSearchParams(window.location.search);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [username, setUsername] = useState<string>();
	const [occupation, setOccupation] = useState<string>();
	const [organization, setOrganization] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const [errMsg, setErrMsg] = useState<string>();

	useEffect(() => {
		setUsername(userContext.user?.profile.username);
		setOccupation(userContext.user?.profile.occupation);
		setOrganization(userContext.user?.profile.organization);
		setDescription(userContext.user?.profile.description);
		return () => {
			setConfirmLoading(false);
		};
	}, [userContext.user?.profile]);

	const handleOk = () => {
		setStatus(undefined);
		if (!username) {
			setStatus({ code: "error", msg: "empty fields" });
			return;
		}
		setConfirmLoading(true);
		userContext.updateProfile(
			{
				username,
				occupation,
				organization,
				description,
			},
			onCancel
		);
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
				visible={params.get("form") === "profile"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div className="main-page-form-container">
					<Avatar
						shape="square"
						style={{ borderRadius: 0, margin: 0 }}
						size={{ xs: 100, sm: 120, md: 120, lg: 150, xl: 150, xxl: 150 }}
						icon={<UserOutlined />}
					/>
					<FormItem label="Username" errorMessage={status?.msg}>
						<Input
							status={status?.code}
							allowClear
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</FormItem>
					<FormItem label="Occupation" errorMessage={status?.msg}>
						<Input
							placeholder="Undergraduate / Data Scientist"
							status={status?.code}
							allowClear
							value={occupation}
							onChange={e => setOccupation(e.target.value)}
						/>
					</FormItem>
					<FormItem label="Organization" errorMessage={status?.msg}>
						<Input
							placeholder="Kumi University"
							status={status?.code}
							allowClear
							value={organization}
							onChange={e => setOrganization(e.target.value)}
						/>
					</FormItem>
					<FormItem label="Description">
						<Input.TextArea
							placeholder="Briefly introduce yourself."
							value={description}
							maxLength={200}
							showCount
							onChange={e => setDescription(e.target.value)}
						/>
					</FormItem>
				</div>
			</Modal>
		</>
	);
};

export default ProfileEditForm;
