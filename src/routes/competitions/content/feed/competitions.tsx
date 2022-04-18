import React, { useState, useEffect } from "react";
import "../style.less";

import { CompetitionCard } from "./Card";
import { get_competitions } from "../../../../api/kaggle";


const Competitions: React.FC = () => {
	const [competitions, setCompetitions] = useState([]);
	useEffect(() => {
		get_competitions("token")
			.then(res => {
				setCompetitions(res.data);
				console.log(res.data)
			})
			.catch(err => {
				console.warn(err.response);
			});
	}, []);

	return (
		<>
			{competitions.map((item: any, index) => (
					item.category === "Featured" && <CompetitionCard
						key={index}
						item={item}
					/>
			))}
			{competitions.map((item: any, index) => (
				item.category !== "Getting Started" && item.category !== "Featured" &&  <CompetitionCard
					key={index}
					item={item}
				/>
			))}
			{competitions.map((item: any, index) => (
				item.category === "Getting Started" && <CompetitionCard
					key={index}
					item={item}
				/>
			))}
		</>
	);
};

export default Competitions;
