import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Competitions from "./competitions";

const Feed: React.FC = props => {
	return (
		<Routes>
			{/* <Route exact path="/feed/moments"> */}
			{/* <Route exact path="/feed/moments">
				<Moments />
			</Route> */}
			<Route path="/feed/competitions" element={<Competitions />} />
		</Routes>
	);
};

export default Feed;
