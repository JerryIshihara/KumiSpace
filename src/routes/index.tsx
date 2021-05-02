import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authConnector, AuthProps } from "redux/lib/auth.type";
import { PageTitleSetter, PrivateRoute } from "components";

import LandingPage from "./landing";
import LoginPage from "./login";
import StreamingPage from "./streaming";

const App: React.FC<AuthProps> = props => {
	return (
		<Router>
			<PageTitleSetter>
				<Switch>
					<Route exact path="/auth/:authMode">
						<LoginPage {...props} />
					</Route>
					<Route path="/">
						{/* <PrivateRoute {...props} altComponent={<LandingPage />}>
							<StreamingPage {...props} />
						</PrivateRoute> */}
						<StreamingPage {...props} />
					</Route>
				</Switch>
			</PageTitleSetter>
		</Router>
	);
};

export default authConnector(App);
