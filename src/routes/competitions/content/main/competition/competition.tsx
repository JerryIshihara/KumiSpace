import React, { useState, useEffect } from "react";
import {
	withRouter,
	RouteComponentProps,
	useParams,
	useHistory,
	Link,
} from "react-router-dom";
import { Avatar, Tabs, Button } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { FiExternalLink } from "react-icons/fi";
import "./style.less";

import TextEllipsis from "components/TextEllipsis";
import MyTeam from "./myTeam";
import Pool from "./pool";
import { TeamCard } from "./card";
import { useCompetition } from "context/kaggleCompetition";
import { tab_constants } from "./tab.constant";

import Teams from "./groups";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}

const Competition: React.FC<Props> = props => {
	const compContext = useCompetition();
	const params = new URLSearchParams(window.location.search);
	const tab = params.get("tab");
	const [tabs, setTabs] = useState<Array<any>>(tab_constants);
	const [loading, setLoading] = useState(true);
	return (
		<div className="main-page">
			<div
				className="main-page-club-block"
				style={{
					backgroundImage: `url(${compContext.competition?.competition_header_image_url})`,
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
								href={
									"https://www.kaggle.com/competitions/" +
									compContext.competition?.name
								}
								target="_blank"
								rel="noreferrer"
								style={{
									fontWeight: "bold",
									fontSize: 30,
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
									lineHeight: 1.5,
								}}
							>
								{compContext.competition?.title}{" "}
								<FiExternalLink style={{ margin: 4 }} />
							</a>
						</TextEllipsis>
						<TextEllipsis
							className="main-page-club-header-info-profile-text"
							numLines={2}
						>
							<h4>{compContext.competition?.description}</h4>
						</TextEllipsis>
						<TextEllipsis className="main-page-club-header-info-profile-text">
							<h4>
								{/* <div className="strm-card-team-num">{}</div> */}
								{Math.floor(Math.random() * 100)} teams to join &middot;{" "}
								{Math.floor(Math.random() * 100)} days to go &middot;{" "}
								{compContext.competition?.category}
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
								key={t.key}
								className={
									t.isActive(tab) ? "main-page-club-block-tab-active" : ""
								}
								// to={`/competitions/${competitionName}${t.path}`}
								to={
									t.path
										? `/competitions/${compContext.competition?.name}/?tab=${t.path}`
										: `/competitions/${compContext.competition?.name}`
								}
							>
								{t.key}
							</Link>
						))}
					</nav>
				</div>
				{compContext.competition?.name && (
					<div className="main-page-club-block main-page-club-block-tabpane-container">
						{!tab && <Teams />}
						{tab === "pool" && (
							<Pool competitionName={compContext.competition?.name} />
						)}
						{tab === "my-team" && (
							<MyTeam competitionName={compContext.competition?.name} />
						)}
					</div>
				)}
			</>
		</div>
	);
};

export default withRouter(Competition);
