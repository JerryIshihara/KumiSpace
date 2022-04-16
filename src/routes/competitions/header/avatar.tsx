import React, { useMemo, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { Menu, Avatar, Dropdown } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import "./style.less";
import { useUser } from "context/user";

const ManageAccount: React.FC<any> = props => {
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

const NavBarAvatar: React.FC<any> = props => {
	const userContext = useUser();
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		if (userContext.user?.avatar.url) {
			console.log(process.env.REACT_APP_HOST + userContext.user?.avatar.url);
			setUrl(process.env.REACT_APP_HOST + userContext.user?.avatar.url)
		}
	}, [userContext.user?.avatar.url])
	
	

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
			<Avatar
				size={36}
				icon={<UserOutlined />}
				style={{ cursor: "pointer" }}
				src={url}
			/>
		</a>
		// </Dropdown>
	);
};

export default withRouter(NavBarAvatar);
