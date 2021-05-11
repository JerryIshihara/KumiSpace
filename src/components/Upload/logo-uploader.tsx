import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import "./style.less";

function getBase64(img: Blob, callback: Function) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file: RcFile) {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
}

const LogoUploader: React.FC = props => {
	const [loading, setLoading] = useState<Boolean>(false);
	const [imageUrl, setimageUrl] = useState<string | undefined>("");

	const handleChange = (info: UploadChangeParam<any>) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl: string | undefined) => {
				setimageUrl(imageUrl);
				setLoading(false);
			});
		}
	};

	return (
		<Upload
			name="logo"
			listType="picture-card"
			className="uploader"
			showUploadList={false}
			action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
			beforeUpload={beforeUpload}
			onChange={handleChange}
			style={{backgroundColor: "red"}}
		>
			{imageUrl ? (
				<img src={imageUrl} alt="logo" style={{ width: "100%" }} />
			) : (
				<div>
					{loading ? <LoadingOutlined /> : <PlusOutlined />}
					<div style={{ marginTop: 8 }}>Upload</div>
				</div>
			)}
		</Upload>
	);
};

export default LogoUploader;
