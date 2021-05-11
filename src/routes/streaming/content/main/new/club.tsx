import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Avatar, Tabs, Button, Space, Form, Input, Upload } from "antd";
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
				<h1>Create a new club page</h1>
				<Space direction="vertical" size={15} style={{ width: "100%" }}>
					<InputItem label="Name">
						<Input
							size="large"
							required
							placeholder="University of Toronto Student Union"
						/>
					</InputItem>

					<InputItem label="Abbreviation">
						<Input size="large" placeholder="UTSU" />
					</InputItem>
					<InputItem label="About us">
						<Input.TextArea size="large" placeholder="About us" />
					</InputItem>
					<InputItem label="Logo">
						<LogoUploader />
					</InputItem>
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
