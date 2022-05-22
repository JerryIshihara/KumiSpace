import React, { useState, useEffect } from "react";
import { Modal, Button, Avatar, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload } from "@arco-design/web-react";

import { FormItem, ImageUploader } from "components";
import { upload_avatar } from "api/user";
import "./style.less";
import { useUser } from "context/user";
import { useAuth } from "context/auth";

interface Props {
	onCancel: () => void;
	onFinish?: () => void;
}

const AvatarEdit: React.FC<Props> = ({ onCancel, onFinish }: Props) => {
	const auth = useAuth();
	const userContext = useUser();
	const params = new URLSearchParams(window.location.search);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [file, setFile] = useState<Blob>();
	const [status, setStatus] = useState<{ code: "error"; msg: string }>();
	const [errMsg, setErrMsg] = useState<string>();

	useEffect(() => {
		// setFile({ url: userContext.user?.avatar?.url });
		return () => {
			setConfirmLoading(false);
		};
	}, [userContext.user?.avatar]);

	const handleOk = () => {
		setConfirmLoading(true);
		auth.authorizedAPI(
			token => upload_avatar(token, file),
			res => {
				console.log(res);
			},
			e => {
				console.warn(e);
			},
			() => {
				setConfirmLoading(false);
				onCancel();
			}
		);
	};

	const handleCancel = () => {
		onCancel();
	};

	return (
		<>
			<Modal
				// title="Add skill"
				visible={params.get("form") === "avatar"}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				footer={[
					<Button
						key="link"
						type="primary"
						disabled={!file}
						loading={confirmLoading}
						onClick={() => {
							setConfirmLoading(true);
							auth.authorizedAPI(
								token => upload_avatar(token, file),
								res => {
									console.log(res);
									message.success("Avatar uploaded")
									userContext.getUser()
								},
								e => {
									console.warn(e);
								},
								() => {
									setConfirmLoading(false);
									onCancel();
								}
							);
						}}
					>
						Save
					</Button>,
				]}
			>
				<h1>Edit your avatar</h1>
				<div className="main-page-form-container vertical-center">
					{/* <ImageUploader icon={<UserOutlined />} onUpload={setUrl}/> */}
					{/* <Avatar
						shape="square"
						style={{ borderRadius: 0, margin: 0 }}
						size={{ xs: 100, sm: 120, md: 120, lg: 150, xl: 150, xxl: 150 }}
						icon={<UserOutlined />}
					/> */}
					{/* <Avatar src={file?.url} size={150} icon={<UserOutlined />} /> */}
					<ImageUploader
						url={
							file
								? URL.createObjectURL(file as Blob)
								: userContext.user?.avatar?.url
						}
						style={{ width: 150, height: 150 }}
						icon={<UserOutlined />}
						onUpload={async (file: Blob) => {
							setFile(file);
						}}
					/>
				</div>
			</Modal>
		</>
	);
};

export default AvatarEdit;
