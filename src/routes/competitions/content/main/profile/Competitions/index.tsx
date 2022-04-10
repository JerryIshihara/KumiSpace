import React, { useCallback, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "antd";

import Competition from "./competition";

const Skills: React.FC<any> = props => {
	const history = useHistory();
	const [skills, setSkills] = useState<Array<any>>([
		{ name: "Python", level: "expert" },
		{ name: "Pytorch", level: "intermediate" },
	]);
	const openForm = (skill?: any) => {
		history.push({
			pathname:
				window.location.pathname + `?form=skill${skill ? "&i=" + skills.indexOf(skill) : "" }`,
			state: skill,
		});
	};
    const handleSubmit = async (skill: any) => {
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
		if (skills.filter((s: any) => skill.name === s.name).length > 0) {
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
			{skills.map((item: any, index: number) => (
				<Competition
					key={index}
					skillName={item.name}
					onPressEdit={() => {
						openForm(skills[index]);
					}}
					last={index === skills.length - 1}
				/>
			))}
		</div>
	);
};

export default Skills;
