import React, { useState } from "react";
import { Button, Divider } from "antd";
import { EditFilled } from "@ant-design/icons";

import TextEllipsis from "../../../../../components/TextEllipsis";

const level = {
	beginner: "#3bdb89",
    intermediate: "#eddb39",
    expert: "#f5079a"
};

interface Props {
	skillName: string;
	skillLevel: "beginner" | "expert";
	last?: boolean;
}

const Skill: React.FC<Props> = ({ skillName, skillLevel, last }: Props) => {
	return (
		<div className="main-page-skill">
			<div className="main-page-skill-container">
				<TextEllipsis
					style={{ width: "fit-content", fontSize: 17, fontWeight: "bold" }}
				>
					{skillName}
				</TextEllipsis>
				<div className="horizontal-center">
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: 100,
							backgroundColor: level[skillLevel],
							marginRight: 4,
						}}
					/>
                    <span>{skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</span>
				</div>
				<Button
					style={{ marginLeft: "auto", marginRight: 0 }}
					type="text"
					icon={<EditFilled />}
				/>
			</div>
			{!last && <Divider style={{margin: 0}}/>}
		</div>
	);
};

export default Skill;
