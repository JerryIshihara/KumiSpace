import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message, Popconfirm } from "antd";
import { EditFilled, LogoutOutlined } from "@ant-design/icons";
import { IconLanguage } from "@arco-design/web-react/icon";

import { InviteRequestProps, MemberProps, PoolProps } from "types/kaggle";
import { edit_pool } from "api/kaggle/pool";
import { useAuth } from "context/auth";
import { useCompetition } from "context/kaggleCompetition";
import { FormItem, TextEllipsis, UserItem } from "components";
import InviteRequests from "./inviteRequests";
import { useHistory } from "react-router-dom";
import { timePassed } from "utils/time";

interface Props {
	pool: PoolProps;
	invite_requests: Array<InviteRequestProps>;
}

const MyPool: React.FC<Props> = React.memo(
	({ pool, invite_requests }: Props) => {
		const auth = useAuth();
		const compContext = useCompetition();
		const history = useHistory();
		const params = new URLSearchParams(window.location.search);
		const [description, setDescription] = useState<string>();
		const [language, setLanguage] = useState<string>();
		const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

		useEffect(() => {
			if (pool) {
				setDescription(pool.description);
				setLanguage(pool.language);
			}
		}, [pool]);

		const handleOk = () => {
			// setStatus(undefined);
			// if (!username) {
			// 	setStatus({ code: "error", msg: "empty fields" });
			// 	return;
			// }
			setConfirmLoading(true);
			auth.authorizedAPI(
				(token: string) =>
					edit_pool(token, pool.public_id, description, language),
				res => {
					compContext.fetch_my_team && compContext.fetch_my_team();
					setConfirmLoading(false);
					message.success("Successfully updated the pool!");					
				},
				() => {
					message.error("Pool update failed!");
				},
				() => {
					setConfirmLoading(false);
					history.goBack()
				}
			);
		};

		const handleCancel = () => {
			console.log("Clicked cancel button");
			history.goBack();
		};

		return (
			<>
				<h1>My Pool</h1>
				{/* <Divider /> */}
				<div
					className="strm-card-team-container"
					style={{
						display: "flex",
						flexDirection: "row",
						// padding: "16px",
						gap: "8px",
					}}
				>
					<div style={{ flex: 1 }}>
						{pool.language && (
							<TextEllipsis style={{ marginBottom: "8px" }}>
								<IconLanguage /> <b>{pool.language}</b>
							</TextEllipsis>
						)}
						{pool.description && (
							<p style={{ fontSize: "small" }}>{pool.description}</p>
						)}
						<p
							style={{
								fontSize: "small",
								color: "GrayText",
								lineHeight: 1,
								margin: 0,
							}}
						>
							{timePassed(pool.updated_on)}
						</p>
					</div>
					<Button
						type="text"
						style={{ marginLeft: "auto" }}
						icon={<EditFilled />}
						onClick={() => {
							history.push(
								window.location.pathname + "?tab=my-team&form=edit-pool"
							);
						}}
					>
						Edit
					</Button>
					<Popconfirm
						title={
							<div>
								<b>Are you sure to leave the pool?</b>
								<p
									style={{
										fontSize: "small",
										color: "GrayText",
										width: "250px",
										margin: 0,
									}}
								>
									Leaving the pool will delete all the invitations.
								</p>
							</div>
						}
						onConfirm={compContext.leave_competition}
						onCancel={() => {}}
						okText="OK"
						cancelText="Cancel"
					>
						<Button>Leave the pool</Button>
					</Popconfirm>
				</div>
				<InviteRequests admin={true} invites={invite_requests} />
				<Modal
					// title="Add skill"
					visible={params.get("form") === "edit-pool"}
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
							</div>
						</FormItem>
					</div>
				</Modal>
			</>
		);
	}
);

export default MyPool;
