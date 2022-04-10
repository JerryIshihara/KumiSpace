import React, { useState } from "react";
import { Button, Divider, Avatar } from "antd";
import { EditFilled, UserOutlined } from "@ant-design/icons";

import TextEllipsis from "components/TextEllipsis";
import "./style.less";

export const CompetitionStatus = {
	ongoing: "#3bdb89",
	intermediate: "#eddb39",
	expert: "#f5079a",
};


interface Props {
	skillName: string;
	last?: boolean;
	onPressEdit: () => void;
}

const Skill: React.FC<Props> = ({
	skillName,
	last,
	onPressEdit,
}: Props) => {
	return (
		<div className="main-page-skill">
			<div className="main-page-profile-competition-container">
				<Avatar
					shape="square"
					size={{ xs: 50, sm: 55, md: 60, lg: 65, xl: 70, xxl: 70 }}
					icon={<UserOutlined />}
				/>
				<div className="main-page-profile-competition-info">
					<TextEllipsis
						className="horizontal-center"
						style={{ fontSize: 16, fontWeight: "bold" }}
						numLines={1}
					>
						Competition Name
					</TextEllipsis>
					<TextEllipsis style={{ fontSize: 13 }}>Some information</TextEllipsis>
					<TextEllipsis style={{ fontSize: 13 }}>ongoing</TextEllipsis>
				</div>
				<div className="main-page-profile-competition-members">
					{[
						...Array(5)
							.fill("")
							.map((item, index) => (
								<Avatar key={index} size={40} icon={<UserOutlined />} />
							)),
					]}
				</div>
				{/* <Button
					style={{ marginLeft: "auto", marginRight: 0 }}
					type="text"
					icon={<EditFilled />}
					onClick={onPressEdit}
				/> */}
			</div>
			{!last && <Divider style={{ margin: 0 }} />}
		</div>
	);
};

export default Skill;
