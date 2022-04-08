import React from "react";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import "./style.less";

import Feed, { Competitions } from "./feed";
import Competition from "./main/competition";

interface Props extends RouteComponentProps {}

const Content: React.FC<Props> = props => {
	return (
		<div className="strm-body strm-content ">
			<div className="strm-content-container">
				<Route exact path="/">
					<Competitions />
				</Route>
				{/* <Route exact path="/feed/:feedType">
					<Feed />
				</Route>
				*/}
				<Route path={"/competitions"}>
					<Competition />
				</Route>
				<Route exact path={["/@:userId", "/@:userId/:tab"]} >
					{/* <UserPage /> */}
				</Route>
			</div>
		</div>
	);
};

export default withRouter(Content);
