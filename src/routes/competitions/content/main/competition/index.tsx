import React from "react";
import {
	Route,
	RouteComponentProps,
	Switch,
	withRouter,
} from "react-router-dom";
import "./style.less";

import Competition from "./competition";
import New from "./new";

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
		<Switch>
			<Route  path={"/competitions/:competitionName/new"}>
				<New />
			</Route>
			<Route
				exact
				path={[
					"/competitions/:competitionName",
					"/competitions/:competitionName/:tab",
				]}
			>
				<Competition />
			</Route>

		</Switch>
	);
};

export default withRouter(Content);