import React from "react";
import { Route } from "react-router-dom";
import "./style.less";

import {ClubCard} from "./Card";
import { Moments, Clubs, Events } from "./feed";
import { ClubPage } from './main';

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
                <Route exact path="/feed/events">
					<Events />
				</Route>
				<Route exact path="/club/:id">
					<ClubPage />
				</Route>
			</div>
		</div>
	);
};

export default Content;
