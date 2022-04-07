import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, Route, Switch } from "react-router-dom";

import Competitions from "./competitions";

const Feed: React.FC = props => {
	return (
		<Switch>
			{/* <Route exact path="/feed/moments"> */}
			{/* <Route exact path="/feed/moments">
				<Moments />
			</Route> */}
			<Route exact path="/feed/competitions">
				<Competitions />
			</Route>
		</Switch>
	);
};

export default Feed;
