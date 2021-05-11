import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { Avatar, Tabs, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

import TextEllipsis from "components/TextEllipsis";
import ClubService from "api/club";
import MomentCard from "./card/card.moment";

import event_img from "assets/event.png";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}

const UserProfile: React.FC<Props> = props => {
	const { userId } = useParams<{ userId: string }>();
	const [loading, setLoading] = useState(true);
	const [detail, setDetail] = useState<
		{ name: string; id: string } | undefined
	>({ name: "...", id: "" });
	useEffect(() => {
		ClubService.fetchClubDetail(userId)
			.then(res => {
				setDetail(res.data);
				setLoading(false);
			})
			.catch(error => console.error(error));

		return () => {
			setLoading(true);
		};
	}, [userId]);
	return (
		<div className="main-page">
			<div className="main-page-club-block">
				<img
					className="main-page-club-header-banner"
					alt="club-banner"
					src={event_img}
				/>
				<div className="main-page-club-header-info-container">
					<div className="main-page-user-header-info-avatar">
						<Avatar
							size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 110, xxl: 128 }}
							icon={<UserOutlined />}
						/>
					</div>
					<div className="main-page-club-header-info-profile-container">
						<TextEllipsis>
							<h1>{loading ? "..." : detail?.name || "no name"}</h1>
						</TextEllipsis>
					</div>
					<div className="main-page-club-header-info-admin">
						<Button style={{ fontWeight: 600 }}>Follow</Button>
						<Button style={{ fontWeight: 600 }}>Edit profile</Button>
					</div>
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
					<Tabs
						defaultActiveKey="Home"
						size="large"
						tabBarGutter={12}
						className="main-page-club-block-tabs"
					>
						{/* <TabPane tab="Home" key="Home"></TabPane> */}
						<TabPane tab="Moments" key="Moments"></TabPane>
						<TabPane tab="Events" key="Events"></TabPane>
						<TabPane tab="Follows" key="Follows"></TabPane>
					</Tabs>
				</div>
				<div className="main-page-club-block main-page-club-block-tabpane-container">
					<MomentCard img={event_img} />
					<MomentCard img={ event_img}/>
					<MomentCard img={event_img} />
					<MomentCard img={ event_img}/>
				</div>
			</>
		</div>
	);
};

export default withRouter(UserProfile);
