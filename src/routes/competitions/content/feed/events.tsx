import React from "react";
import "../style.less";

import { EventCard } from "./Card";

const Clubs: React.FC = () => {
	return (
		<>
			{[...Array(23).keys()].map(_ => (
				<EventCard key={_} />
			))}
		</>
	);
};

export default Clubs;
