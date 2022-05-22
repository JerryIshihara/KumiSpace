import React, { useEffect, useState, useMemo } from "react";
// import { AuthProps } from "../../redux/lib/auth.type";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "context/auth";

interface Props {
	path?: string;
}
const PrivateRoute: React.FC<Props> = props => {
	const auth = useAuth();
	const [loading, setLoading] = useState<Boolean>(true);

	useEffect(() => {
		auth
			.status()
			.then(res => {
				setLoading(false);
			})
			.catch(e => {
				console.warn(e);
			});
	}, []);

	return (
		<>
			{loading ? (
				<></>
			) : auth.token !== undefined ? (
				props.children
			) : (
				<Navigate
					to="/auth/sign-in" /* state: window.location.pathname */
				/>
			)}
		</>
	);
};

export default PrivateRoute;
