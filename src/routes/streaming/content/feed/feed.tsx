import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, Route, Switch } from "react-router-dom";

import Moments from "./moments";
import Clubs from "./clubs";
import Events from "./events";

const Feed: React.FC = props => {
	return (
		<Switch>
			<Route exact path="/feed/moments">
				<Moments />
			</Route>
			<Route exact path="/feed/clubs">
				<Clubs />
			</Route>
			<Route exact path="/feed/events">
				<Events />
			</Route>
		</Switch>
	);
};

export default Feed;
