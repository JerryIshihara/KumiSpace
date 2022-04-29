import React, { useState, useEffect } from "react";
import { Divider, Button, Space, Form, Input, Radio } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import "./style.less";

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

const NewMoment: React.FC = props => {
	const onFinish = (values: any) => {
		console.log(values);
	};
	return (
		<div className="main-page">
			<div className="main-page-block main-page-block-padding">
				<h1>Post a new moment</h1>
				<Divider />
				<Input.TextArea
					size="large"
					bordered={false}
					placeholder="Share you moment"
					style={{ padding: 0, fontSize: 17, height: 100 }}
				/>
				<Divider />
				<div>
					<h3>Who can view</h3>
					<Radio.Group onChange={() => {}} value={1}>
						<Radio value={1}>Public</Radio>
						<Radio value={2}>Friend</Radio>
						<Radio value={3}>Private</Radio>
					</Radio.Group>
				</div>
				<div className="new-moment-bottom-container">
					<Space size={15} style={{ fontSize: 30 }}>
						<PictureOutlined />
						<Divider type="vertical" />
					</Space>
					<Space size={15}>
						<Button size="large" type="text">
							Discard
						</Button>
						<Button size="large" type="primary">
							Post
						</Button>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default NewMoment;
