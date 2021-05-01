import React from "react";
import "./style.less";
import { Space, Button } from "antd";
// import { Link } from "react-router-dom";

import { Logo, Navbar } from "../../../components";
import Category from "./category";

const LandingNavbar: React.FC = () => {
	return (
		<Navbar>
			<div className="landing-navbar-container">
				<div className="landing-navbar-content">
					<Space size={10}>
						<Logo href={"/"}/>
					</Space>
				</div>
				<div className="landing-navbar-content">
					<Space size={20}>
						{/* <Search /> */}
						{/* <Category /> */}
						<Category />
						<Button type="text" size="large">
							Moments
						</Button>
						<Button size="large" href="/login">Get Started</Button>
					</Space>
				</div>
			</div>
		</Navbar>
	);
};

export default LandingNavbar;
