import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { logoutType } from "../../../redux/lib/auth.action";

import { Menu, Avatar, Dropdown } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import "./style.less";

interface MenuProps {
	logout: logoutType;
}
const ManageAccount: React.FC<MenuProps> = props => {
	return (
		<div className="shadow">
			<Menu selectedKeys={[]}>
				<Menu.Item icon={<UserOutlined />}>
					<a href="/usr/lalal"> My Profile </a>
				</Menu.Item>
				<Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
				<Menu.Item icon={<LogoutOutlined />} onClick={props.logout}>
					Log out
				</Menu.Item>
			</Menu>
		</div>
	);
};

interface Props extends RouteComponentProps {
	logout: logoutType;
}
const NavBarAvatar: React.FC<Props> = props => {
	return (
		// <Dropdown
		// 	placement="bottomRight"
		// 	trigger={['click']}
		// 	overlay={
		// 		<ManageAccount
		// 			logout={() => props.logout(() => props.history.push("/"))}
		// 		/>
		// 	}
		// >
		<a href="/usr/lalal">
			{" "}
			<Avatar size={36} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
		</a>
		// </Dropdown>
	);
};

export default withRouter(NavBarAvatar);
