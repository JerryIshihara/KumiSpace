import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { logoutType } from "../../../redux/lib/auth.action";

import { Menu, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

import "./style.less";

interface MenuProps {
	logout: logoutType;
}
const ManageAccount: React.FC<MenuProps> = props => {
	return (
		<div className="shadow">
			<Menu selectedKeys={[]}>
				<Menu.Item>1st menu item</Menu.Item>
				<Menu.Item>2nd menu item</Menu.Item>
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
		<Dropdown
			placement="bottomRight"
			overlay={
				<ManageAccount
					logout={() => props.logout(() => props.history.push("/"))}
				/>
			}
		>
			<Avatar size={40} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
		</Dropdown>
	);
};

export default withRouter(NavBarAvatar);
