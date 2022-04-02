import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useParams, Link } from "react-router-dom";
import { Avatar, Tabs, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

import TextEllipsis from "components/TextEllipsis";
import ClubService from "api/club";
import {tab_constants } from './club.constant';

import event_img from "assets/event.png";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}

const ClubPage: React.FC<Props> = props => {
	const { id, tab } = useParams<{ id: string, tab: string | undefined }>();
	const [loading, setLoading] = useState(true);
	const [detail, setDetail] = useState<
		{ name: string; id: string } | undefined
	>({ name: "...", id: "" });
	useEffect(() => {
		ClubService.fetchClubDetail(id)
			.then(res => {
				setDetail(res.data);
				setLoading(false);
			})
			.catch(error => console.error(error));

		return () => {
			setLoading(true);
		};
	}, [id]);
	return (
		<div className="main-page">
			<div className="main-page-club-block">
				<img
					className="main-page-club-header-banner"
					alt="club-banner"
					src={event_img}
				/>
				<div className="main-page-club-header-info-container">
					<div className="main-page-club-header-info-avatar">
						<Avatar
							shape="square"
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
						<Button style={{ fontWeight: 600 }}>Join</Button>
						<Button style={{ fontWeight: 600 }}>Follow</Button>
						<Button style={{ fontWeight: 600 }}>Admin View</Button>
					</div>
				</div>
			</div>
			<>
				<div className="main-page-club-block main-page-club-block-tab-container main-page-club-block-sticky">
					{/* <Tabs
						defaultActiveKey="Home"
						size="large"
						tabBarGutter={12}
						className="main-page-club-block-tabs"
					>
						<TabPane tab="Home" key="Home"></TabPane>
						<TabPane tab="Moments" key="Moments"></TabPane>
						<TabPane tab="Events" key="Events"></TabPane>
						<TabPane tab="Members" key="Members"></TabPane>
					</Tabs> */}
										<nav>
						{tab_constants.map(t => (
							<Link
								className={
									t.isActive(tab) ? "main-page-club-block-tab-active" : ""
								}
								to={`/club/${id}${t.path}`}
							>
								{t.key}
							</Link>
						))}
					</nav>
				</div>
				<div className="main-page-club-block main-page-club-block-tabpane-container">
					{[...Array(10).keys()].map(() => (
						<div
							style={{
								width: "100%",
								height: "100px",
								backgroundColor: "gray",
								marginBottom: "10px",
							}}
						/>
					))}
				</div>
			</>
		</div>
	);
};

export default withRouter(ClubPage);