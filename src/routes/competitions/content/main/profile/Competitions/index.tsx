import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "antd";

import { get_my_competitions } from "api/kaggle";
import { useAuth } from "context/auth";
import Competition from "./competition";

const Competitions: React.FC<any> = props => {
	const auth = useAuth();
	const history = useHistory();
	const [content, setContent] = useState<Array<any>>([]);

	useEffect(() => {
		get_my_competitions(auth.token)
			.then(res => {
				setContent(res.data);
			})
			.catch(e => {
				console.warn(e.response);
			});
	}, [auth.token]);

	return (
		<div className="main-page-skills">
			{content.map((item: any, index: number) => (
						<Competition
							key={index}
							content={item}
							last={index === content.length - 1}
						/>
					))}
		</div>
	);
};

export default Competitions;
