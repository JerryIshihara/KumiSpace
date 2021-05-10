import React from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { Menu, Dropdown } from "antd";
import { PlusCircleOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { RiGroupLine } from "react-icons/ri";

import "./style.less";
import { ReactIcon } from "components";

const CreateOps: React.FC = props => {
	return (
		<div className="shadow">
			<Menu style={{ fontSize: 16 }}>
				<Menu.Item icon={<ThunderboltOutlined style={{ fontSize: 17 }} />}>
					<a href="/new/moment"> New moment </a>
				</Menu.Item>
				<Menu.Item icon={<ReactIcon icon={<RiGroupLine />} size={17} />}>
					<a href="/new/club"> Start a club</a>
				</Menu.Item>
			</Menu>
		</div>
	);
};

const Plus: React.FC = props => {
	return (
		<Dropdown placement="bottomRight" overlay={<CreateOps />}>
			<PlusCircleOutlined className="strm-header-icon" />
		</Dropdown>
	);
};

export default withRouter(Plus);
