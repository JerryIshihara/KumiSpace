import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "context/auth";
import { UserContextProvider } from "context/user";
import { NotificationContextProvider } from "context/notification";
import "./index.css";
import App from "./routes";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		{/* <Provider store={store}> */}
		<AuthContextProvider>
			<UserContextProvider>
				<NotificationContextProvider>
					<App />
				</NotificationContextProvider>
			</UserContextProvider>
		</AuthContextProvider>
		{/* </Provider> */}
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
