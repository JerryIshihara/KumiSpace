import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import * as uuid from "uuid";
import "./style.less";

import { Menu, Avatar } from "antd";
import {
	ThunderboltFilled,
	HomeFilled,
	UserOutlined,
	CalendarFilled,
} from "@ant-design/icons";
import { RiGroupFill } from "react-icons/ri";

const PARTICIPATIONS = [...Array(20).keys()].map(i => {
	return { name: `U of T Clubs ${i}`, id: uuid.v4() };
});

interface Props extends RouteComponentProps {}

const Side: React.FC<Props> = props => {
	const getLocation = (pathname: string): string => {
		const loc = pathname.split("/");
		return loc.length > 0 && loc[loc.length - 1].length > 0
			? loc[loc.length - 1]
			: "home";
	};
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
					<Menu.Item
						key="events"
						icon={<CalendarFilled />}
						onClick={() => props.history.push("/feed/events")}
					>
						Events
					</Menu.Item>
					<Menu.Divider />
					<Menu.ItemGroup key="sub2" title="Participations">
						{PARTICIPATIONS.map(club => (
							<Menu.Item
								key={club.id}
								icon={
									<Avatar
										className="ant-menu-item-icon"
										size={26}
										icon={<UserOutlined size={14} />}
										style={{ cursor: "pointer", verticalAlign: "middle" }}
									/>
								}
								onClick={ () => props.history.push(`/club/${club.id}`)}
							>
								{club.name}
							</Menu.Item>
						))}
					</Menu.ItemGroup>
				</Menu>
			</div>
		</div>
	);
};

export default withRouter(Side);
