import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import "./style.less";

import { Menu, Avatar } from "antd";
import {
	ThunderboltFilled,
	HomeFilled,
	UserOutlined,
	CalendarFilled,
} from "@ant-design/icons";
import { RiGroupFill } from "react-icons/ri";

// const { SubMenu } = Menu;
// import SideButton from "./sideButton";

interface Props extends RouteComponentProps {}

const Side: React.FC<Props> = props => {
	const getLocation = (pathname: string): string => {
		const loc = pathname.split("/");
		return loc.length > 0 && loc[loc.length - 1].length > 0
		? loc[loc.length - 1]
		: "home"
	}
	const [key, setKey] = useState<string>(getLocation(props.location.pathname));
	useEffect(() => {
		setKey(getLocation(props.location.pathname));
	}, [props.location.pathname]);
	return (
		<div className="strm-side">
			<div className="strm-side-container">
				<Menu
					className="strm-side-buttons"
					mode="inline"
					defaultSelectedKeys={[key]}
					onClick={() => {}}
				>
					<Menu.Item
						key="home"
						icon={<HomeFilled />}
						onClick={() => props.history.push("/")}
					>
						Home
					</Menu.Item>
					<Menu.Item
						key="moments"
						icon={<ThunderboltFilled />}
						onClick={() => props.history.push("/feed/moments")}
					>
						Moments
					</Menu.Item>
					<Menu.Item
						key="clubs"
						icon={
							<RiGroupFill
								className="ant-menu-item-icon"
								style={{ verticalAlign: "-4%" }}
							/>
						}
						onClick={() => props.history.push("/feed/clubs")}
					>
						Clubs
					</Menu.Item>
					<Menu.Item icon={<CalendarFilled />} key="events">
						Events
					</Menu.Item>
					<Menu.Divider />
					<Menu.ItemGroup key="sub2" title="Participations">
						<Menu.Item
							key="5"
							icon={
								<Avatar
									className="ant-menu-item-icon"
									size={26}
									icon={<UserOutlined size={14} />}
									style={{ cursor: "pointer", verticalAlign: "middle" }}
								/>
							}
						>
							U-of-T Club
						</Menu.Item>
						<Menu.Item
							key="6"
							icon={
								<Avatar
									className="ant-menu-item-icon"
									size={26}
									icon={<UserOutlined size={14} />}
									style={{ cursor: "pointer", verticalAlign: "middle" }}
								/>
							}
						>
							U-of-T Club
						</Menu.Item>
					</Menu.ItemGroup>
				</Menu>
			</div>
		</div>
	);
};

export default withRouter(Side);
