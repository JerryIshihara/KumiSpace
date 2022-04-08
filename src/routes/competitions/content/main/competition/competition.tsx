import React, { useState, useEffect } from "react";
import {
	withRouter,
	RouteComponentProps,
	useParams,
	useHistory,
	Link,
} from "react-router-dom";
import { Avatar, Tabs, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FiExternalLink } from "react-icons/fi";
import "./style.less";

import TextEllipsis from "components/TextEllipsis";
import ClubService from "api/club";
import { TeamCard } from "./card";
import { tab_constants as club_constants } from "./club.constant";
import { tab_constants as user_constants } from "../profile/user.constant";

import event_img from "assets/event.png";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}

const Competition: React.FC<Props> = props => {
	const history = useHistory();
	const { competitionName, tab } = useParams<{
		competitionName: string;
		tab: string | undefined;
	}>();
	const [tabs, setTabs] = useState<Array<any>>(club_constants);
	const [loading, setLoading] = useState(true);
	const [detail, setDetail] = useState<
		{ name: string; id: string } | undefined
	>({ name: "...", id: "" });
	useEffect(() => {
		// TODO: get id by condition
		// setTabs(userId ? user_constants : club_constants);
		// const finalId = userId || clubId;
		// if (!finalId) return;
		// ClubService.fetchClubDetail(finalId)
		// 	.then(res => {
		// 		setDetail(res.data);
		// 		setLoading(false);
		// 	})
		// 	.catch(error => console.error(error));
		setDetail({ name: competitionName, id: "123" });
		setLoading(false);
		return () => {
			setLoading(true);
		};
	}, [competitionName]);
	return (
		<div className="main-page">
			<div
				className="main-page-club-block"
				style={{
					backgroundImage: `url("https://picsum.photos/${1000}/${500}?random=1")`,
					backgroundSize: "cover",
				}}
			>
				<div
					className="main-page-club-header-info-container"
					style={{
						background: "linear-gradient(transparent, #00000095)",
					}}
				>
					<div className="main-page-club-header-info-profile-container">
						<TextEllipsis className="main-page-club-header-info-profile-text">
							<a
								href="https://www.kaggle.com/competitions/ubiquant-market-prediction/overview"
								style={{ fontWeight: "bold", fontSize: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: 1.5 }}
							>
								{loading ? "..." : detail?.name || "no name"}{" "}
								<FiExternalLink style={{ margin: 4 }} />
							</a>
						</TextEllipsis>
						<TextEllipsis
							className="main-page-club-header-info-profile-text"
							numLines={2}
						>
							<h4>
								This is description! This is description! This is description!
								This is description! This is description!
							</h4>
						</TextEllipsis>
						<TextEllipsis className="main-page-club-header-info-profile-text">
							<h4>
								{/* <div className="strm-card-team-num">{}</div> */}
								{Math.floor(Math.random() * 100)} teams to join &middot;{" "}
								{Math.floor(Math.random() * 100)} days to go
							</h4>
						</TextEllipsis>
					</div>
					{/* <div className="main-page-club-header-info-admin">
						<Button
							href="https://www.kaggle.com/competitions/ubiquant-market-prediction/overview"
							target="_blank"
							type="link"
							style={{
								color: "white",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								width: "fit-content",
							}}
						>
							 Go to the competition page
						</Button>
					</div> */}
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
						{tabs.map(t => (
							<Link
								className={
									t.isActive(tab) ? "main-page-club-block-tab-active" : ""
								}
								to={`/competitions/${competitionName}/${t.path}`}
							>
								{t.key}
							</Link>
						))}
					</nav>
					<Button
						type="primary"
						style={{ fontWeight: 600, marginLeft: "auto", color: "white" }}
						onClick={() => {
							history.push(`/competitions/${competitionName}/new?type=team`);
						}}
						// href={`/competitions/${competitionName}/team/new`}
					>
						Create a team
					</Button>
				</div>
				<div className="main-page-club-block main-page-club-block-tabpane-container">
					{[...Array(10).keys()].map(() => (
						<TeamCard />
					))}
				</div>
			</>
		</div>
	);
};

export default withRouter(Competition);
