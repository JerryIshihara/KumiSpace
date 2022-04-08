import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Avatar, Tabs, Button, Space, Select, Input, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

import { LogoUploader } from "components/Upload";
import ClubService from "api/club";

import event_img from "assets/event.png";
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
	const onFinish = (values: any) => {
		console.log(values);
	};
	return (
		<div className="main-page">
			<div className="main-page-block main-page-block-padding">
				<h1>Create a new team</h1>
				<Space direction="vertical" size={15} style={{ width: "100%" }}>
					<InputItem label="Name">
						<Input
							size="large"
							required
							placeholder=""
						/>
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
					<InputItem label="Join requirement">
						<Input.TextArea size="large" placeholder="" />
					</InputItem>
					{/* <InputItem label="Logo">
						<LogoUploader />
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
			</div>
		</div>
	);
};

export default withRouter(CreatePage);
