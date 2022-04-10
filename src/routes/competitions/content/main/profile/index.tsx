import React, { useState, useEffect } from "react";
import {
	withRouter,
	RouteComponentProps,
	useParams,
	Link,
	useHistory,
} from "react-router-dom";
import { Avatar, Tabs, Button, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import TextEllipsis from "components/TextEllipsis";
import ClubService from "api/club";

import { tab_constants } from "./user.constant";
import ProfileEditForm from "./profileEditForm";
import Skills from "./Skills";
import Competitions from "./Competitions";
import "./style.less";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps { }

export type ProfileProps = {
	username: string | undefined;
	occupation: string | undefined;
	organization: string | undefined;
	description: string | undefined;
}

const UserProfile: React.FC<Props> = props => {
	const history = useHistory();
	const params = new URLSearchParams(window.location.search);
	const tab = params.get("tab");
	const [profile, setProfile] = useState<ProfileProps>({
		username: "Jerry",
		occupation: "Meng",
		organization: "Berkeley",
		description: "Win!",
	});
	const { userId } = useParams<{ userId: string }>();
	// const [tabKey, setTabKey] = useState<string>("Home");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		// ClubService.fetchClubDetail(userId)
		// 	.then(res => {
		// 		setDetail(res.data);
		// 		setLoading(false);
		// 	})
		//     .catch(error => console.error(error));
		// return () => {
		// 	setLoading(true);
		// };
	}, [userId]);
	return (
		<div className="main-page">
			<div
				className="main-page-club-block main-page-profile-container"
				style={{ padding: 0 }}
			>
				<Avatar
					shape="square"
					style={{ borderRadius: 0, margin: 0 }}
					size={{ xs: 100, sm: 120, md: 120, lg: 150, xl: 150, xxl: 150 }}
					icon={<UserOutlined />}
				/>
				<div className="main-page-profile">
					<TextEllipsis
						style={{ fontSize: 25, fontWeight: "bold", width: "fit-content" }}
					>
						{profile.username}
					</TextEllipsis>
					<TextEllipsis style={{ width: "fit-content" }}>
						{profile.occupation} @ {profile.organization}
					</TextEllipsis>
					<TextEllipsis
						style={{ width: "fit-content", color: "GrayText", margin: "4px 0" }}
					>
						{profile.description}
					</TextEllipsis>
				</div>
				<div className="main-page-profile-buttons">
					{/* <Button style={{ fontWeight: 600 }}>Follow</Button> */}
					<Button
						onClick={() => {
							history.push({pathname: window.location.pathname + "?form=profile", state: profile});
						}}
						style={{ fontWeight: 600 }}
					>
						Edit profile
					</Button>
					<ProfileEditForm
						onCancel={() => {
							history.goBack();
						}}
						onSubmit={(profile: ProfileProps) => {setProfile(profile)}}
					/>
				</div>
			</div>
			{/* <div className="main-page-club-block main-page-club-block">
				<div className="main-page-user-header-info-container">
					<Avatar
						shape="circle"
						size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 110, xxl: 128 }}
						icon={<UserOutlined />}
					/>
					<div className="main-page-club-header-info-profile-container">
						<TextEllipsis>
							<h1>{loading ? "..." : detail?.name || "My name lalala"}</h1>
						</TextEllipsis>
					</div>
					<div className="main-page-user-header-info-more">
						<EllipsisOutlined />
					</div>
				</div>
				<div className="main-page-user-header-social-container">
					<TextEllipsis>
						<h3>123 moments {Bullet} 3 Clubs { Bullet } 123 Followings</h3>
					</TextEllipsis>
				</div>
			</div> */}
			<>
				<div className="main-page-club-block main-page-club-block-tab-container main-page-club-block-sticky">
					{/* <Tabs
						activeKey={tabKey}
						size="large"
						tabBarGutter={12}
						className="main-page-club-block-tabs"
						onChange={setTabKey}
					>
						<TabPane tab={<a href={`/@${userId}`}>Home</a>} key="Home"></TabPane>
						<TabPane tab={<a href={`/@${userId}/moments`}>Moments</a>} key="Moments"></TabPane>
						<TabPane tab="Clubs" key="Clubs"></TabPane>
						<TabPane tab="Events" key="Events"></TabPane>
						<TabPane tab="Follows" key="Follows"></TabPane>
					</Tabs> */}
					<nav>
						{tab_constants.map(t => (
							<Link
								className={
									t.isActive(tab) ? "main-page-club-block-tab-active" : ""
								}
								to={t.path ? `/usr/${userId}?tab=${t.path}` : `/usr/${userId}`}
							>
								{t.key}
							</Link>
						))}
					</nav>
				</div>
				<div className="main-page-club-block main-page-club-block-tabpane-container">
					{!tab && <Skills />}

					{tab === "competitions" && <Competitions />}
				</div>
			</>
		</div>
	);
};

export default withRouter(UserProfile);
