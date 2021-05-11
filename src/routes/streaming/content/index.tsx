import React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import "./style.less";

import Feed, { Moments } from "./feed";
import { ClubPage, UserPage } from "./main/page";
import New from "./main/new";

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-body strm-content ">
			<div className="strm-content-container">
				<Route exact path="/">
					<Moments />
				</Route>
				<Route exact path="/feed/:feedType">
					<Feed />
				</Route>
				<Route exact path="/new/:newContentType">
					<New />
				</Route>
				<Route exact path={["/club/:id", "/club/:id/:tab"]}>
					<ClubPage />
				</Route>
				<Route exact path={["/@:userId", "/@:userId/:tab"]} >
					<UserPage />
				</Route>
			</div>
		</div>
	);
};

export default withRouter(Content);
