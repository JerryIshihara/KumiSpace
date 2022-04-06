import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ClubService from "api/club";
import "./style.less";

import { Menu, Avatar } from "antd";
import {
	NumberOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { feedItems } from "./feed.constant";
const { SubMenu } = Menu;

interface Props extends RouteComponentProps {}

const Side: React.FC<Props> = props => {
	const getLocation = (pathname: string): string => {
		const loc = pathname.split("/");
		if (loc.every(l => l === "")) {
			return "home";
		}
		if (loc.includes("feed")) {
			return loc[loc.length - 1];
		}
		return ""
	};
	const [hasUpdate, setHasUpdate] = useState(true);
	const [par, setPar] = useState<any>([]);
	const [follows, setFollows] = useState<any>([]);
	useEffect(() => {
		var pe = performance.getEntriesByType("navigation");
			var pnt =
				pe.length > 0 ? (pe[0] as PerformanceNavigationTiming) : undefined;
		if (hasUpdate) {
			const sessionContent = sessionStorage.getItem("sideBar");
			if (sessionContent !== null && pnt?.type === "navigate") {
				const { par, follow } = JSON.parse(sessionContent);
				setPar(par || []);
				setFollows(follow || []);
			} else {
				const promise_par = ClubService.fetchClubsNameAndAvatar(
					"PARTICIPATIONS"
				);
				const promise_fol = ClubService.fetchClubsNameAndAvatar("FOLLOWS");
				Promise.all([promise_par, promise_fol])
					.then(values => {
						setPar(values[0].data || []);
						setFollows(values[1].data || []);
						sessionStorage.setItem(
							"sideBar",
							JSON.stringify({
								par: values[0].data,
								follow: values[1].data,
							})
						);
					})
					.catch(error => console.error(error));
			}
			setHasUpdate(false);
		}
	}, [hasUpdate]);
	return (
		<div className="strm-side">
			<div className="strm-side-container">
				<Menu
					className="strm-side-buttons"
					mode="inline"
					defaultSelectedKeys={[feedItems[0].title]}
					selectedKeys={[getLocation(props.location.pathname)]}
					onClick={() => {}}
				>
					{feedItems.map(item => (
						<Menu.Item
							key={item.title.toLowerCase()}
							icon={item.icon()}
						>
							<a href={item.path}> {item.title} </a>
						</Menu.Item>
					))}
					<Menu.Divider />
					{/* Menu.ItemGroup */}
					<SubMenu key="sub2" title={"Participations"}>
						{par.map((club: { id: string; name: string }) => (
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
							>
								<a href={`/club/${club.id}`}>{club.name}</a>
							</Menu.Item>
						))}
					</SubMenu>
					<Menu.Divider />
					<SubMenu key="sub3" title={"Follows"}>
						{follows.map((club: { id: string; name: string }) => (
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
							>
								<a href={`/club/${club.id}`}>{club.name}</a>
							</Menu.Item>
						))}
					</SubMenu>
					<Menu.Divider />
					{/* <SubMenu key="sub4" title={"HashTags"}>
						{follows.map((club: { id: string; name: string }) => (
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
							>
								<a href={`/club/${club.id}`}>{club.name}</a>
							</Menu.Item>
						))}
					</SubMenu> */}
				</Menu>
			</div>
		</div>
	);
};

export default withRouter(Side);
