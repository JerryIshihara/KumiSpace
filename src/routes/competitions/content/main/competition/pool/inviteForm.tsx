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

import { sent_invite_request } from "api/kaggle";
import FormItem from "components/FormItem";
import "./style.less";
import { useAuth } from "context/auth";

interface Props {
	user: {
		profile: {
			username: string
		},
		public_id: string,
	};
}

const InviteForm: React.FC<Props> = (props: Props) => {
	const auth = useAuth();
	const { competitionName } = useParams<{
		competitionName: string;
	}>();
	
	const history = useHistory()
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
		sent_invite_request(auth.token, competitionName, props.user.public_id)
			.then(res => {
				console.log(res.data);
				history.goBack()
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
		history.goBack()
	};

	return (
		<>
			<Modal
				// title="Add skill"
				visible={params.get("form") === "invite"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<h1>Invite {props.user.profile.username}</h1>
				<div className="main-page-form-container">
					<FormItem label="Description">
						<Input.TextArea
							placeholder="Briefly introduce your team and the expectation on this competition."
							value={description}
							maxLength={200}
							showCount
							onChange={e => {
								setDescription(e.target.value);
							}}
						/>
					</FormItem>
				</div>
			</Modal>
		</>
	);
};

export default InviteForm;
