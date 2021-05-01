import React from "react";
import "./style.less";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const INST_CATEGARY = [{ key: "U.S." }, { key: "Canada" }, { key: "China" }];

const FeaturedClubs: React.FC = () => (
	<div>
		<h1 style={{ textAlign: "center" }}>
			Explore universities and institutions
		</h1>

		<Tabs defaultActiveKey={INST_CATEGARY[0].key} size="large" animated>
			{INST_CATEGARY.map(cat => (
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
