import React, { useEffect } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";

interface Props extends RouteComponentProps {}

const PageTitleSetter: React.FC<Props> = props => {
	// const { category, id } = useParams<{ category: string | undefined,  }>();
	useEffect(() => {
		// Home Page
		const parts = props.location.pathname.split("/");
		if (parts.length >= 2) {
			const cat = parts[parts.length - 2];
			const subCat = parts[parts.length - 1];
			switch (cat.toUpperCase()) {
				case "AUTH":
					document.title = StrTemplate(subCat.replace("-", " "));
					break;
				case "CLUB":
					document.title = StrTemplate(cat);
					break;
				case "FEED":
					document.title = StrTemplate(subCat);
					break;
				default:
					document.title = StrTemplate(cat);
					break;
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