import React from "react";
import {
	Redirect,
	Route,
	RouteComponentProps,
	withRouter,
} from "react-router-dom";
import "./style.less";

import { PrivateRoute } from "components";
import Feed, { Competitions } from "./feed";
import Competition from "./main/competition";
import UserProfile from "./main/profile";

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-body strm-content ">
			<div className="strm-content-container">
				{/* <Route exact path="/">
					<Competitions />
				</Route> */}
				{/* <Route exact path="/feed/:feedType">
					<Feed />
				</Route>
				*/}
				<Route exact path={["/usr/:userId"]}>
					<PrivateRoute>
						<UserProfile />
					</PrivateRoute>
					{/* <UserProfile /> */}
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
			</div>
		</div>
	);
};

export default withRouter(Content);
