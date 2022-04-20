import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "antd";

import Competition from "./competition";
import { useUser } from "context/user";

const Competitions: React.FC<any> = props => {
	const user = useUser();
	const competitions = useMemo(
		() => (
			<div className="main-page-skills">
				{user.competitions.map((item: any, index: number) => (
					<Competition
						key={index}
						content={item}
						last={index === user.competitions.length - 1}
					/>
				))}
			</div>
		),
		[user.competitions]
	);
	return competitions;
};

export default Competitions;
