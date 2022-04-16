import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { Avatar, Tabs, Button, Space, Select, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

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

interface Props extends RouteComponentProps {}
const CreatePage: React.FC<Props> = props => {
	const history = useHistory();
	const params = new URLSearchParams(window.location.search);
	const [username, setUsername] = useState<string>();
	const [url, setUrl] = useState<any>();
	const [occupation, setOccupation] = useState<string>();
	const [organization, setOrganization] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const onFinish = (values: any) => {
		console.log(values);
	};
	const handleOk = () => {
		setStatus(undefined);
		if (!username) {
			setStatus({ code: "error", msg: "empty fields" });
			return;
		}
		setConfirmLoading(true);
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
				<InputItem label="Name">
					<Input size="large" required placeholder="" />
				</InputItem>

				<InputItem label="Number of teammates">
					<Select style={{ width: "200px" }} size="large">
						{[
							...Array(5)
								.fill("")
								.map((item, index) => (
									<Select.Option value={index + 1}>{index + 1}</Select.Option>
								)),
						]}
					</Select>
				</InputItem>
				<InputItem label="Join requirement (optional)">
					<Input.TextArea size="large" placeholder="" />
				</InputItem>
				{/* <InputItem label="Logo">
						<ImageUploader />
					</InputItem> */}
				<Button
					className="login-form-submit"
					size="large"
					type="primary"
					style={{ width: "100%" }}
				>
					Create
				</Button>
			</Space>
		</Modal>
	);
};

export default withRouter(CreatePage);
