import React, { useEffect, useRef } from "react";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import "./style.less";

import { ClubCard } from "./Card";
import Feed from "./feed";
import { ClubPage } from "./main";

interface Props extends RouteComponentProps { }


const Content: React.FC<Props> = props => {
	return (
		// <div className="strm-content-placeholder-container">
		// 	{/* Left placeholder */}
		// 	<div className="strm-content-placeholder-left" />
			<div className="strm-content">
				<div className="strm-content-container">
					<Route exact path="/">
						{[...Array(20).keys()].map(_ => (
							<ClubCard key={_} />
						))}
					</Route>
					<Route exact path="/feed/:feedType">
						<Feed />
					</Route>
					<Route exact path="/club/:id">
						<ClubPage />
					</Route>
				</div>
			</div>
		// </div>
	);
};

export default withRouter(Content);
