import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { Menu, Avatar, Button } from "antd";
import {
	UserOutlined,
	LogoutOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import "./style.less";
import { useUser } from "context/user";
import { useAuth } from "context/auth";

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
	const auth = useAuth();
	const userContext = useUser();
	const [url, setUrl] = useState<string>();
	const show = useMemo(() => (auth.token ? true : false), [auth.token]);

	useEffect(() => {
		if (userContext.user?.avatar?.url) {
			console.log(process.env.REACT_APP_HOST + userContext.user?.avatar?.url);
			setUrl(process.env.REACT_APP_HOST + userContext.user?.avatar?.url);
		}
	}, [userContext.user]);


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
		<>
			{show ? (
				<Link
					to={{
						pathname: `/usr/${userContext.user?.public_id}`,
						state: { isAuthenticated: auth.token },
					}}
				>
					<Avatar
						size={36}
						icon={<UserOutlined />}
						style={{ cursor: "pointer" }}
						src={url}
					/>
				</Link>
			) : (
				<div className="horizontal-center" style={{ gap: "8px" }}>
					<Button href="/auth/sign-in" type="text" >
						Sign in
					</Button>
					<Button href="/auth/sign-up" >
						Sign up
					</Button>
				</div>
			)}
		</>

		// </Dropdown>
	);
};

export default NavBarAvatar;
