import React  from "react";
import {withRouter, RouteComponentProps} from "react-router";
import { logoutType } from "../../../redux/lib/auth.action";

import { Menu, Avatar, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";


interface MenuProps {
	logout: logoutType;
}
const ManageAccount: React.FC<MenuProps> = (props) => {
	return (
		<div className="shadow">
			<Menu>
				<Menu.Item>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.antgroup.com"
					>
						1st menu item
					</a>
				</Menu.Item>
				<Menu.Item>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.aliyun.com"
					>
						2nd menu item
					</a>
				</Menu.Item>
				<Menu.Item>
					<Button type="text" onClick={props.logout}>Log out</Button>
				</Menu.Item>
			</Menu>
		</div>
	);
};

interface Props extends RouteComponentProps {
	logout: logoutType;
}
const NavBarAvatar: React.FC<Props> = (props) => {
	return (
		<Dropdown placement="bottomRight" overlay={<ManageAccount logout={() => props.logout(() => props.history.push("/"))}/>}>
			<Avatar
				size={40}
				icon={<UserOutlined />}
				style={{ cursor: "pointer" }}
			/>
		</Dropdown>
	);
};

export default withRouter(NavBarAvatar);
