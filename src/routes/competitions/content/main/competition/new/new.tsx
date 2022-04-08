import React from "react";
import { useParams } from "react-router-dom";
import CreateNewTeam from "./team";
import CreateNewMoment from "./moment";

const New: React.FC = () => {
	const params = new URLSearchParams(window.location.search);

	switch (params.get("type")) {
		case "team":
			return <CreateNewTeam />;
		case "moment":
			return <CreateNewMoment />;
		default:
            return <></>;
	}
};

export default New;
