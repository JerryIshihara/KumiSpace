import React from "react";
import "../style.less";

import { ClubCard } from "../Card";

const Clubs: React.FC = () => {
	return (
		<>
			{[...Array(Math.floor(Math.random() * 20 + 5)).keys()].map(_ => (
				<ClubCard key={_} />
			))}
		</>
	);
};

export default Clubs;
