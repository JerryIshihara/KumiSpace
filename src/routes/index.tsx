import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { PageTitleSetter, PrivateRoute } from "components";

import LoginPage from "./login";
import UserProfilePage from "./profile";
import { Competitions } from "./feed";
import Competition from "./competition";
import NotificationPage from "./notifications";

const App: React.FC<any> = props => {
	return (
		<Router>
			<PageTitleSetter>
				<Switch>
					{/* <Route exact path="/">
						<Competitions />
					</Route> */}
					<Route exact path="/auth/:authMode">
						<LoginPage {...props} />
					</Route>
					<Route exact path="/notifications">
						<NotificationPage {...props} />
					</Route>
					<Route exact path={["/usr/:userId"]}>
						<PrivateRoute>
							<UserProfilePage />
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
					<Route path="/">
						{/* <PrivateRoute {...props} altComponent={<LandingPage />}>
							<StreamingPage {...props} />
						</PrivateRoute> */}
						<Competitions {...props} />
					</Route>
				</Switch>
			</PageTitleSetter>
		</Router>
	);
};

export default App;
