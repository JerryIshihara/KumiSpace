import React from "react";
import { useParams } from "react-router-dom";
import CreateClubPage from "./club";
import CreateNewMoment from "./moment";

const New: React.FC = () => {
	const { newContentType } = useParams<{ newContentType: string }>();

	switch (newContentType) {
		case "club":
			return <CreateClubPage />;
		case "moment":
			return <CreateNewMoment />;
		default:
            return <></>;
	}
};

export default New;
