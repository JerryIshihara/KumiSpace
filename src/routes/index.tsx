import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authConnector, AuthProps } from "../redux/lib/auth.type";
import { PageTitleSetter } from "../components";

import LandingPage from "./landing";
import LoginPage from "./login";
import StreamingPage from "./streaming";
import PrivateRoute from "../components/PrivateRoute";

const App: React.FC<AuthProps> = props => {
	return (
		<Router>
			<Switch>
				<PageTitleSetter>
					<Route exact path="/login">
						<LoginPage {...props} />
					</Route>
					<Route path="/">
						{/* <PrivateRoute {...props} altComponent={<LandingPage />}>
						<StreamingPage {...props} />
					</PrivateRoute> */}
						<StreamingPage {...props} />
					</Route>
				</PageTitleSetter>
			</Switch>
		</Router>
	);
};

export default authConnector(App);
