import React from "react";
import "./style.less";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const CLUB_CATEGARY = [{ key: "Music" }, { key: "Sports" }, { key: "Science" }];

const FeaturedClubs: React.FC = () => (
	<div>
		<h1 style={{ textAlign: "center" }}>
			Explore student clubs from the world
		</h1>
		<Tabs defaultActiveKey={CLUB_CATEGARY[0].key} size="large" animated>
			{CLUB_CATEGARY.map(cat => (
				<TabPane tab={cat.key} key={cat.key}>
					<div className="landing-featuredclubs-list">
						<div style={{ width: 300, height: 300, backgroundColor: "grey" }} />
						<div style={{ width: 300, height: 300, backgroundColor: "grey" }} />
						<div style={{ width: 300, height: 300, backgroundColor: "grey" }} />
						<div style={{ width: 300, height: 300, backgroundColor: "grey" }} />
					</div>
				</TabPane>
			))}
		</Tabs>
	</div>
);

export default FeaturedClubs;
