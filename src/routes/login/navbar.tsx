import React from "react";
import "./style.less";

import { Logo, Navbar } from "../../components";
// import Avatar from "./avatar";
// import Search from "./search";

const LandingNavbar: React.FC = () => {
	return (
		<Navbar>
			<div className="login-navbar-container">
				<Logo href={"/"} />
			</div>
		</Navbar>
	);
};

export default LandingNavbar;
