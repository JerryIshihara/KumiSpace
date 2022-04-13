import React, { useEffect, useState, useMemo } from "react";
// import { AuthProps } from "../../redux/lib/auth.type";
import { Redirect } from "react-router-dom";
import { useAuth } from "context/auth";

interface Props {
	path?: string;
}
const PrivateRoute: React.FC<Props> = props => {
	const auth = useAuth();
	const show = useMemo(() => auth.token ? true : false, [auth.token]);

	return (
		<>
			{show ? (
				props.children
			) : (
				<Redirect
					to={{ pathname: "/auth/sign-in", state: window.location.pathname }}
				/>
			)}
		</>
	);
};

export default PrivateRoute;
