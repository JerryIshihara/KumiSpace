import React from "react";
import { Route } from "react-router-dom";
import "./style.less";

import {ClubCard} from "./Card";
import {Moments, Clubs} from "./feed";

const Content: React.FC = () => {
	return (
		<div className="strm-content">
			<div className="strm-content-container">
				<Route exact path="/">
					{[...Array(1).keys()].map(_ => (
						<ClubCard key={_} />
					))}
				</Route>
				<Route exact path="/feed/moments">
					<Moments />
				</Route>
                <Route exact path="/feed/clubs">
					<Clubs />
				</Route>
			</div>
		</div>
	);
};

export default Content;
