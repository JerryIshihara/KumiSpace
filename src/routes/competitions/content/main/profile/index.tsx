import React, { useState, useEffect } from "react";
import {
	withRouter,
	RouteComponentProps,
	useParams,
	Link,
} from "react-router-dom";
import { Avatar, Tabs, Button, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

import TextEllipsis from "components/TextEllipsis";
import ClubService from "api/club";
// import { MomentCard, ClubCard, FollowCard } from "./card";
import { tab_constants } from "./user.constant";

import event_img from "assets/event.png";
import Skill from "./skill";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}

const UserProfile: React.FC<Props> = props => {
	const { userId, tab } = useParams<{
		userId: string;
		tab: string | undefined;
	}>();
	// const [tabKey, setTabKey] = useState<string>("Home");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		// ClubService.fetchClubDetail(userId)
		// 	.then(res => {
		// 		setDetail(res.data);
		// 		setLoading(false);
		// 	})
        //     .catch(error => console.error(error));
        console.log(tab);
        
		// return () => {
		// 	setLoading(true);
		// };
	}, [userId, tab]);
	return (
		<div className="main-page">
            <div className="main-page-club-block main-page-profile-container">
            <Avatar
							size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
							icon={<UserOutlined />}
                />
                						<TextEllipsis style={{fontSize: 25, fontWeight: 'bold'}}>
							{"no name"}
                </TextEllipsis>
                <TextEllipsis>
                    Current Experience
                </TextEllipsis>
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
								to={`/usr/${userId}${t.path}`}
							>
								{t.key}
							</Link>
						))}
                    </nav>
                    <div className="main-page-profile-buttons">
						{/* <Button style={{ fontWeight: 600 }}>Follow</Button> */}
						<Button style={{ fontWeight: 600 }}>Edit profile</Button>
					</div>
				</div>
				<div className="main-page-club-block main-page-club-block-tabpane-container">
					 {!tab && (
						<div className="main-page-skills">
                            <Skill skillName={"Python"} skillLevel="expert" />
                            <Skill skillName={"Tensorflow"} skillLevel="beginner" last />
                            <Button>Add skill</Button>
						</div>
                    )}
                    
					{tab === "competitions" && (
						<>
							<span>asdasdasd</span>
						</>
                    )}
				</div>
			</>
		</div>
	);
};

export default withRouter(UserProfile);