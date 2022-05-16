import React, { useState, useMemo } from "react";
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
import { timeToDeadline } from "utils/time";
import { utf16ToText } from "utils/text";
import { useCompetition } from "context/kaggleCompetition";
import { tab_constants } from "./tab.constant";

import TeamsToJoin from "./groups";
import AllTeams from "./allTeams";
import { KaggleCompetitionProps } from "types/kaggle";

const { TabPane } = Tabs;

interface CompetitionBannerProps {
	competition: KaggleCompetitionProps;
	numTeams: number;
	numTeamsToJoins: number;
	numUsers: number;
}
const CompetitionBanner: React.FC<CompetitionBannerProps> = React.memo(
	({
		competition,
		numTeams,
		numUsers,
		numTeamsToJoins,
	}: CompetitionBannerProps) => (
		<div
			className="main-page-club-block"
			style={{
				backgroundImage: `url(${competition.competition_header_image_url})`,
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
							href={"https://www.kaggle.com/competitions/" + competition.name}
							target="_blank"
							rel="noreferrer"
							style={{
								fontWeight: "bold",
								fontSize: 27,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								lineHeight: 1.5,
							}}
						>
							{utf16ToText(competition.title)}{" "}
							<FiExternalLink style={{ margin: 4 }} />
						</a>
					</TextEllipsis>
					<TextEllipsis
						className="main-page-club-header-info-profile-text"
						numLines={2}
					>
						<h4>{utf16ToText(competition.description)}</h4>
					</TextEllipsis>
					<TextEllipsis className="main-page-club-header-info-profile-text">
						<h4>
							{/* <div className="strm-card-team-num">{}</div> */}
							{numTeams} teams &middot; {numTeamsToJoins} teams to join &middot;{" "}
							{timeToDeadline(competition.deadline)} &middot;{" "}
							{competition.category}
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
	)
);

interface Props extends RouteComponentProps {}
const Competition: React.FC<Props> = props => {
	const compContext = useCompetition();
	const params = new URLSearchParams(window.location.search);
	const tab = params.get("tab");
	const [tabs, setTabs] = useState<Array<any>>(tab_constants);
	const [loading, setLoading] = useState(true);

	return (
		<div className="main-page">
			{compContext.competition && (
				<CompetitionBanner
					numTeams={compContext.teams?.length || 0}
					numTeamsToJoins={
						(
							compContext.teams?.filter(
								team => team.members.length < team.num_members
							) || []
						).length
					}
					competition={compContext.competition}
					numUsers={0}
				/>
			)}
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
						{!tab && <AllTeams teams={compContext.teams || []} />}
						{tab === "join" && (
							<TeamsToJoin
								teams={
									compContext.teams?.filter(
										team => team.members.length < team.num_members
									) || []
								}
							/>
						)}
						{tab === "pool" && <Pool />}
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
