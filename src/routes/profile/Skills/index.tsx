import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";

import Skill from "./skill";
import SkillForm from "./skillForm";
import { UserSkillProps, useUser } from "context/user";

const Skills: React.FC<any> = props => {
	const navigate = useNavigate();
	const userContext = useUser()
	const skills = useMemo(() => userContext.user?.skills || [], [userContext.user?.skills])
	const openForm = (skill?: UserSkillProps) => {
		navigate(window.location.pathname + `?form=skill${skill ? "&id=" + skill.public_id : "" }`, {state: skill});
	};
    // const handleSubmit = async (skill: SkillType) => {
    //     const params = new URLSearchParams(window.location.search);
    //     const i = Number(params.get("i") !== null ? params.get("i") : -1)
    //     console.log(i);
    //     if (i > -1) {
    //         if (skills.filter((item, index) => index !== i && item.name === skill.name).length > 0) {
    //             return new Promise((res, rej) => {
    //                 rej("Skill already exists");
    //             });
    //         } else {
    //             skills.splice(i, 1, skill)
    //             setSkills(skills);
    //             return new Promise((res, rej) => {
    //                 res("Success");
    //             });
    //        }
    //     }
	// 	if (skills.filter((s: SkillType) => skill.name === s.name).length > 0) {
	// 		return new Promise((res, rej) => {
	// 			rej("Skill already exists");
	// 		});
	// 	} else {
	// 		setSkills([...skills, skill]);
	// 		return new Promise((res, rej) => {
	// 			res("Success");
	// 		});
	// 	}
	// };

	return (
		<div className="main-page-skills">
			{skills.map((item: UserSkillProps, index: number) => (
				<Skill
					key={index}
					skill={item}
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
				onFinish={() => {
					navigate(-1);
				}}
			/>
		</div>
	);
};

export default Skills;
