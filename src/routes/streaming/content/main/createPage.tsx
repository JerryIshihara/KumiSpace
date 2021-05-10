import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import { Avatar, Tabs, Button, Space, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.less";

import TextEllipsis from "components/TextEllipsis";
import ClubService from "api/club";

import event_img from "assets/event.png";

const { TabPane } = Tabs;

interface Props extends RouteComponentProps {}

const CreatePage: React.FC<Props> = props => {
	const { id } = useParams<{ id: string }>();
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
				<div className="main-page-club-header-info-container">
					<Space direction="vertical" size={15} style={{ width: "100%" }}>
						<Input size="large" placeholder="First Name" />
						<Input size="large" placeholder="Last Name" />
						<Input size="large" placeholder="Email Address" />
						<Input.Password size="large" placeholder="Passworld" />
						<Input.Password size="large" placeholder="Confirm Passworld" />
						<Button
							className="login-form-submit"
							size="large"
							type="primary"
							style={{ width: "100%" }}
						>
							Submit
						</Button>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default withRouter(CreatePage);
