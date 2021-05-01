import React from "react";
import "./style.less";

const NavBar: React.FC = (props) => {
	return (
		<div className="navbar">
			<div className="navbar-container">
				{props.children}
			</div>
		</div>
	);
};

export default NavBar;
