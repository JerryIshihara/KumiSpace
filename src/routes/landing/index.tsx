import React from "react";
import "./style.less";

import Navbar from "./Navbar";
import Banner from "./banner";
import FeaturedClubs from "./featuredClubs";
import Universities from "./universities";

const LandingPage: React.FC = () => (
	<div className="body-center">
		<Navbar />
		<div className="page-body-container">
			<Banner />
			<FeaturedClubs />
			<Universities />
		</div>
	</div>
);

export default LandingPage;
