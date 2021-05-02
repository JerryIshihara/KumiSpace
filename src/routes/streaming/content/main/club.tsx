import React from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

import event_img from "../../../../assets/event.png";

interface Props extends RouteComponentProps {}

const ClubPage: React.FC<Props> = props => {
	const { id } = useParams<{ id: string }>();
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
						<Avatar shape="square" size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 100, xxl: 128 }} icon={<UserOutlined />} />
					</div>
					<div className="main-page-club-header-info-profile-container">
						<h3>This club has id {id}</h3>
					</div>
				</div>
				<h3>This club has id {id}</h3>
			</div>
		</div>
	);
};

export default withRouter(ClubPage);
