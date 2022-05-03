import React, { useState, useEffect } from "react";
import "./style.less"

import { Header } from "components"
import { CompetitionCard } from "./Card";
import { get_competitions } from "api/kaggle";

const Competitions: React.FC = () => {
	const [competitions, setCompetitions] = useState([]);
	useEffect(() => {
		get_competitions()
			.then(res => {
				console.log(res.data);
				setCompetitions(res.data);
			})
			.catch(err => {
				console.warn(err);
			});
	}, []);

	return (
		<div className="strm-page">
			<Header />
			<div className="strm-body strm-content">
				<div className="feed-grid" style={{width: "80%", minWidth: "800px", padding: "20px 0"}}>
					{competitions.map(
						(item: any, index) =>
							item.category === "Featured" && (
								<CompetitionCard key={index} item={item} />
							)
					)}
					{competitions.map(
						(item: any, index) =>
							item.category !== "Getting Started" &&
							item.category !== "Featured" && (
								<CompetitionCard key={index} item={item} />
							)
					)}
					{competitions.map(
						(item: any, index) =>
							item.category === "Getting Started" && (
								<CompetitionCard key={index} item={item} />
							)
					)}
				</div>
			</div>
		</div>
	);
};

export default Competitions;
