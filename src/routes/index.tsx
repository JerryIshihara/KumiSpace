import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { authConnector, AuthProps } from "redux/lib/auth.type";
import { PageTitleSetter, PrivateRoute } from "components";

import LandingPage from "./landing";
import LoginPage from "./login";
import Competitions from "./competitions";
import NotificationPage from "./notifications";

const App: React.FC<any> = props => {
	return (
		<Router>
			<PageTitleSetter>
				<Switch>
					<Route exact path="/auth/:authMode">
						<LoginPage {...props} />
					</Route>
					<Route exact path="/notifications">
						<NotificationPage {...props} />
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
