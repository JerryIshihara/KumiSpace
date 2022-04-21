import React, { useState, useEffect } from "react";
import "../style.less";

import { CompetitionCard } from "./Card";
import { get_competitions } from "api/kaggle";
import competition from "../main/competition";


const Competitions: React.FC = () => {
	const [competitions, setCompetitions] = useState([]);
	useEffect(() => {
		get_competitions()
			.then(res => {
				console.log(res.data)
				setCompetitions(res.data);
				
			})
			.catch(err => {
				console.warn(err);
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
