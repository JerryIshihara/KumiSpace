import React from "react";
import { Route, Routes } from "react-router-dom";
import "./style.less";

import { CompetitionProvider } from "context/kaggleCompetition";
import Competition from "./competition";
import { Header, MultiRoute } from "components";

interface Props {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-page">
			<Header />
			<div className="strm-body strm-content ">
				<div className="strm-content-container main-page">
					<Routes>
						{MultiRoute({
							paths: ["/:competitionName", "/:competitionName/:tab"],
							element: (
								<CompetitionProvider>
									<Competition />
								</CompetitionProvider>
							),
						})}
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Content;
