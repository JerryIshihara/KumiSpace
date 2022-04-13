import React, { useState } from "react";
import { Button, Divider } from "antd";
import { EditFilled } from "@ant-design/icons";

import TextEllipsis from "components/TextEllipsis";
import "./style.less";
import { UserSkillProps } from "context/user";

export const Level = {
	beginner: "#3bdb89",
	intermediate: "#eddb39",
	expert: "#f5079a",
};

interface Props {
	skill: UserSkillProps;
	last?: boolean;
	onPressEdit: () => void;
}

const Skill: React.FC<Props> = ({ skill, last, onPressEdit }: Props) => {
	return (
		<div className="main-page-skill">
			<div className="main-page-skill-container">
				<TextEllipsis
					style={{ width: "fit-content", fontSize: 17, fontWeight: "bold" }}
				>
					{skill.name}
				</TextEllipsis>
				{skill.level && (
					<div className="horizontal-center">
						<div
							style={{
								width: 10,
								height: 10,
								borderRadius: 100,
								backgroundColor: Level[skill.level],
								marginRight: 4,
							}}
						/>
						<span>
							{skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
						</span>
					</div>
				)}

				<Button
					style={{ marginLeft: "auto", marginRight: 0 }}
					type="text"
					icon={<EditFilled />}
					onClick={onPressEdit}
				/>
			</div>
			{!last && <Divider style={{ margin: 0 }} />}
		</div>
	);
};

export default Skill;
