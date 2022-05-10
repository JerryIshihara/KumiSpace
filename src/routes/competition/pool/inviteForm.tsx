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

import { sent_invite_request } from "api/kaggle/group";
import FormItem from "components/FormItem";
import "./style.less";
import { useAuth } from "context/auth";
import { useCompetition } from "context/kaggleCompetition";

interface Props {
	user: {
		profile: {
			username: string;
		};
		public_id: string;
	};
}

const InviteForm: React.FC<Props> = (props: Props) => {
	const auth = useAuth();
	const { competitionName } = useParams<{
		competitionName: string;
	}>();
	const compContext = useCompetition();
	const history = useHistory();
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
		if (!compContext.myTeam?.team) {
			setConfirmLoading(false);
			history.goBack();
			message.warning("You need to be a team leader to invite.");
			return;
		}
		auth.authorizedAPI(
			token =>
				sent_invite_request(token, competitionName, props.user.public_id),
			res => {
				console.log(res.data);
				setConfirmLoading(false);
				history.goBack();
				message.success("You have invited " + props.user.profile.username);
			},
			e => {
				setConfirmLoading(false);
				console.warn(e.response);
				if (e.response.status === 409) {
					history.goBack();
					switch (e.response.data.status) {
						case "pending":
							message.warn(
								`You have invited ${props.user.profile.username} already`
							);
							break;
						case "rejected":
							message.warn(
								`${props.user.profile.username} has rejected you invitation already`
							);
							break;
						default:
							break;
					}
				}
			},
			() => {
				setConfirmLoading(false);
			},
			() => {
				history.push("/auth/sign-in");
			}
		);
	};

	const handleCancel = () => {
		setStatus(undefined);
		console.log("Clicked cancel button");
		history.goBack();
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
