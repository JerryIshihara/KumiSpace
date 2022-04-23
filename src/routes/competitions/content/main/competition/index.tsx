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

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
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
	);
};

export default withRouter(Content);
