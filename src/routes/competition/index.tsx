import React from "react";
import {
	Route,
	RouteComponentProps,
	Switch,
	withRouter,
} from "react-router-dom";
import "./style.less";

import { CompetitionProvider } from "context/kaggleCompetition";
import Competition from "./competition";
import { Header } from "components";

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-page">
			<Header />
			<div className="strm-body strm-content ">
				<div className="strm-content-container">
					<Switch>
						<Route
							exact
							path={[
								"/competitions/:competitionName",
								"/competitions/:competitionName/:tab",
							]}
						>
							<CompetitionProvider>
								<Competition />
							</CompetitionProvider>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Content);
