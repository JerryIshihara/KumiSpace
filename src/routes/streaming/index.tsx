import React from "react";
import "./style.less";

import { AuthProps } from "../../redux/lib/auth.type";
import Header from "./header/index";
import Side from "./side/index";
import Content from "./content/index";

interface Props extends AuthProps { }

const StreamingPage: React.FC<Props> = (props) => {
	return (
		<div className="strm-page">
            <Header logout={props.logout}/>
			<div className="strm-body">
				<Side />
				<Content />
			</div>
		</div>
	);
};

export default StreamingPage;
