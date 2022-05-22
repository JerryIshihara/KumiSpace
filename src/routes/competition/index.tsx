import React from "react";
import { Route, Routes } from "react-router-dom";
import "./style.less";

import { CompetitionProvider } from "context/kaggleCompetition";
import Competition from "./competition";
import { Header } from "components";

interface Props {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-page">
			<Header />
			<div className="strm-body strm-content ">
				<div className="strm-content-container main-page">
					<Routes>
						<Route path="/competitions/:competitionName">
							<CompetitionProvider>
								<Competition />
							</CompetitionProvider>
						</Route>
						<Route path="/competitions/:competitionName/:tab">
							<CompetitionProvider>
								<Competition />
							</CompetitionProvider>
						</Route>
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Content;
