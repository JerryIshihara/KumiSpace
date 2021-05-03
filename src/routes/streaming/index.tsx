import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./style.less";

import { AuthProps } from "../../redux/lib/auth.type";
import Header from "./header/index";
import Side from "./side/index";
import Content from "./content/index";

interface Props extends AuthProps, RouteComponentProps {}

const StreamingPage: React.FC<Props> = props => {
	useEffect(() => {
		const unlisten = props.history.listen(() => {
			// window.location.reload();
		});
		return () => {
			unlisten();
		};
	});
	return (
		<div className="strm-page">
			<Header logout={props.logout} />
			<div className="strm-body">
				<Side />
				<Content />
			</div>
		</div>
	);
};

export default withRouter(StreamingPage);
