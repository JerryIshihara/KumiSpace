import React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import "./style.less";

import { ClubCard } from "./Card";
import Feed from "./feed";
import { ClubPage, UserPage } from "./main";

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-body strm-content ">
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
				<Route exact path="/@:userId">
					<UserPage />
				</Route>
			</div>
		</div>
	);
};

export default withRouter(Content);
