import React, { useState } from "react";
import { Button, Divider, Avatar } from "antd";
import { SelectOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";

import { TextEllipsis } from "components";
import { timeToDeadline } from "utils/time";
import "./style.less";

interface CompetitionProps {
	title: string;
	competition_header_image_url: string;
	deadline: Date;
}
interface MemberProps {
	user: any;
}

interface Props {
	content: {
		competition: CompetitionProps;
		members?: Array<MemberProps>;
		user?: any;
		name?: string,
	};
	last?: boolean;
}

const Competition: React.FC<Props> = ({ content, last }: Props) => {
	return (
		<div className="main-page-skill">
			<div className="main-page-profile-competition-container">
				<Avatar
					shape="square"
					size={{ xs: 50, sm: 55, md: 60, lg: 65, xl: 70, xxl: 70 }}
					icon={<UserOutlined />}
					src={content.competition.competition_header_image_url}
				/>
				<div className="main-page-profile-competition-info">
					<TextEllipsis
						className="horizontal-center"
						style={{ fontSize: 15, fontWeight: "bold" }}
						numLines={1}
					>
						{content.competition.title}
					</TextEllipsis>
					<TextEllipsis style={{ fontSize: 13 }}>{content.members ?<> <TeamOutlined /> {content.name} </>: "In the pool"}</TextEllipsis>
					<TextEllipsis style={{ fontSize: 13 }}>{timeToDeadline(content.competition.deadline)}</TextEllipsis>
				</div>
				<div
					className="main-page-profile-competition-members"
					style={{ marginLeft: "auto" }}
				>
					{content?.members ? (
						content?.members.map((member, index) => (
							<Avatar
								key={index}
								size={{ xs: 30, sm: 30, md: 35, lg: 35, xl: 40, xxl: 40 }}
								icon={<UserOutlined />}
								src={
									member?.user?.avatar &&
									process.env.REACT_APP_HOST + member?.user?.avatar?.url
								}
							/>
						))
					) : (
						<Avatar
						size={{ xs: 30, sm: 30, md: 35, lg: 35, xl: 40, xxl: 40 }}
						icon={<UserOutlined />}
						src={
							content?.user?.avatar &&
							process.env.REACT_APP_HOST + content?.user?.avatar?.url
						}
					/>
					)}
				</div>
			</div>
			{!last && <Divider style={{ margin: 0 }} />}
		</div>
	);
};

export default Competition;
