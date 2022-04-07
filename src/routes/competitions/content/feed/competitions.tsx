import React from "react";
import "../style.less";

import { CompetitionCard } from "./Card";

const Clubs: React.FC = () => {
	return (
		<>
			{[...Array(Math.floor(Math.random() * 20 + 5)).keys()].map(_ => (
				<CompetitionCard key={_} imageUrl={"https://picsum.photos/" + 2000 + "/" + 3000 + "?random=2"}/>
			))}
		</>
	);
};

export default Clubs;
