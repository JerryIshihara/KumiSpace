import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const PageTitleSetter: React.FC<Props> = props => {
	useEffect(() => {
		// Home Page
		const parts = props.location.pathname.split("/");
		if (parts.length >= 2) {
			const cat = parts[parts.length - 2];
			const comp = parts[parts.length - 1];
			if (cat === "club") {
				document.title = StrTemplate(cat);
			} else {
				document.title = StrTemplate(comp);
			}
		}
	}, [props.location.pathname]);
	const StrTemplate = (name: string): string => {
		return `${
			name.length === 0
				? ""
				: `${name.charAt(0).toUpperCase() + name.slice(1)} - `
		}Kumi`;
	};
	return <>{props.children}</>;
};

export default withRouter(PageTitleSetter);
