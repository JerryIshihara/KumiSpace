import React, { useCallback, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "antd";

import Skill, { SkillType } from "./skill";
import SkillForm from "./skillForm";

const Skills: React.FC<any> = props => {
	const history = useHistory();
	const [skills, setSkills] = useState<Array<SkillType>>([
		{ name: "Python", level: "expert" },
		{ name: "Pytorch", level: "intermediate" },
	]);
	const openForm = (skill?: SkillType) => {
		history.push({
			pathname:
				window.location.pathname + `?form=skill${skill ? "&i=" + skills.indexOf(skill) : "" }`,
			state: skill,
		});
	};
    const handleSubmit = async (skill: SkillType) => {
        const params = new URLSearchParams(window.location.search);
        const i = Number(params.get("i") !== null ? params.get("i") : -1)
        console.log(i);
        if (i > -1) {
            if (skills.filter((item, index) => index !== i && item.name === skill.name).length > 0) {
                return new Promise((res, rej) => {
                    rej("Skill already exists");
                });
            } else {
                skills.splice(i, 1, skill)
                setSkills(skills);
                return new Promise((res, rej) => {
                    res("Success");
                });
           }
        }
		if (skills.filter((s: SkillType) => skill.name === s.name).length > 0) {
			return new Promise((res, rej) => {
				rej("Skill already exists");
			});
		} else {
			setSkills([...skills, skill]);
			return new Promise((res, rej) => {
				res("Success");
			});
		}
	};

	return (
		<div className="main-page-skills">
			{skills.map((item: SkillType, index: number) => (
				<Skill
					key={index}
					skillName={item.name}
					skillLevel={item.level}
					onPressEdit={() => {
						openForm(skills[index]);
					}}
					last={index === skills.length - 1}
				/>
			))}
			<Button
				onClick={() => {
					openForm();
				}}
			>
				Add skill
			</Button>
			<SkillForm
				onCancel={() => {
					history.goBack();
				}}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default Skills;
