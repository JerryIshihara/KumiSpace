import React, {useEffect} from "react";
import "../style.less";

import { ClubCard } from "../Card";

const Clubs: React.FC = () => {
	return (
		<>
			{[...Array(23).keys()].map(_ => (
				<ClubCard key={_} />
			))}
		</>
	);
};

export default Clubs;
