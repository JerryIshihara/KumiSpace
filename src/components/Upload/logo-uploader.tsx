import React, { useState, useEffect } from "react";
import { Upload, Progress } from "@arco-design/web-react";
import { IconPlus, IconEdit } from "@arco-design/web-react/icon";
import {
	LoadingOutlined,
	UserOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import ImgCrop from "antd-img-crop";
import "./style.less";

function getBase64(img: Blob, callback: Function) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

// function beforeUpload(file: RcFile) {
// 	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
// 	if (!isJpgOrPng) {
// 		message.error("You can only upload JPG/PNG file!");
// 	}
// 	const isLt2M = file.size / 1024 / 1024 < 10;
// 	if (!isLt2M) {
// 		message.error("Image must smaller than 10MB!");
// 	}
// 	return isJpgOrPng && isLt2M;
// }

interface Props {
	icon?: React.ReactElement;
	onUpload: (file: any) => void;
	style?: React.CSSProperties;
	imageStyle?: React.CSSProperties;
	url?: string;
}

const ImageUploader: React.FC<Props> = (props: Props) => {
	// const [loading, setLoading] = useState<Boolean>(false);
	const [file, setFile] = useState<any>();
	const cs = `arco-upload-list-item${
		file && file.status === "error" ? " is-error" : ""
	}`;
	useEffect(() => {
		if (props.url) {
			setFile({ url: props.url });
		}
	}, [props.url]);

	// const handleChange = (info: UploadChangeParam<any>) => {
	// 	console.log(info.file);

	// 	if (info.file.status === "uploading") {
	// 		setStatus("loading");
	// 	}
	// 	if (info.file.status === "done") {
	// 		// Get this url from response in real world.
	// 		getBase64(info.file.originFileObj, (imageUrl: string | undefined) => {
	// 			setimageUrl(imageUrl);
	// 			props.onUpload(imageUrl);
	// 			setStatus(undefined);
	// 		});
	// 	}
	// 	if (info.file.status === "error") {
	// 		setStatus("error");
	// 	}
	// };

	return (
		<div style={{ margin: 0 }}>
			<Upload
				style={{ ...props.style, margin: 0 }}
				action="/"
				fileList={file ? [file] : []}
				showUploadList={false}
				onChange={(_, currentFile) => {
					const _file = {
						...currentFile,
						url: URL.createObjectURL(currentFile.originFile as Blob),
					};
					setFile(_file);
					if (currentFile.status !== "uploading") {
						props.onUpload(_file);
					}
				}}
				onProgress={currentFile => {
					setFile(currentFile);
				}}
			>
				<div
					className={cs}
					style={{ width: "100%", height: "100%", margin: 0 }}
				>
					{file && file.url ? (
						<div
							className="arco-upload-list-item-picture custom-upload-avatar"
							style={{ ...props.style, borderRadius: 0, padding: 0 }}
						>
							<img
								src={file.url}
								alt="upload"
								style={{ width: "100%", height: "100%", margin: 0, objectFit: "cover" }}
							/>
							<div
								className="arco-upload-list-item-picture-mask"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<IconEdit />
							</div>
							{file.status === "uploading" && file.percent < 100 && (
								<Progress
									percent={file.percent}
									type="circle"
									size="mini"
									style={{
										position: "absolute",
										left: "50%",
										top: "50%",
										transform: "translateX(-50%) translateY(-50%)",
									}}
								/>
							)}
						</div>
					) : (
						<div
							className="arco-upload-trigger-picture"
							style={{ ...props.style, borderRadius: 0, padding: 0, margin: 0 }}
						>
							<div className="arco-upload-trigger-picture-text">
								<UserOutlined style={{ fontSize: 30 }} />
								{/* <div style={{ marginTop: 10, fontWeight: 600 }}>Upload</div> */}
							</div>
						</div>
					)}
				</div>
			</Upload>
		</div>
	);
};

export default ImageUploader;
