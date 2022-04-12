import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./style.less";

// import { AuthProps } from "../../redux/lib/auth.type";
import Header from "./header/index";
import Side from "./side/index";
import Content from "./content/index";

interface Props extends RouteComponentProps {}

const StreamingPage: React.FC<Props> = props => {
	return (
		<div className="strm-page">
			<Header logout={() => {}} />
			<Content />
		</div>
	);
};

export default withRouter(StreamingPage);
