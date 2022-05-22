import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTitleSetter, PrivateRoute } from "components";
import LoginPage from "./login";
import UserProfilePage from "./profile";
import { Competitions } from "./feed";
import Competition from "./competition";
import NotificationPage from "./notifications";

const App: React.FC<any> = props => {
	return (
		<BrowserRouter>
			<PageTitleSetter>
				<Routes>
					<Route path="/" element={<Competitions />} />

					<Route path="/auth/:authMode/*" element={<LoginPage />} />
					<Route path="/notifications" element={<NotificationPage />} />
					<Route
						path={"/usr/:userId/*"}
						element={
							<PrivateRoute>
								<UserProfilePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/competitions/:competitionName"
						element={<Competition />}
					/>
					<Route
						path="/competitions/:competitionName/:tab"
						element={<Competition />}
					/>
				</Routes>
			</PageTitleSetter>
		</BrowserRouter>
	);
};

export default App;
