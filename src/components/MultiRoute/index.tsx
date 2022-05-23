import React from "react";
import { Route, Routes } from "react-router-dom";

interface Props {
	paths: Array<string>;
	element?: React.ReactNode | null;
}

const MultiRoute = (props: Props) => {
	return props.paths
		.map((path: string, index: number) => (
			<Route key={index} path={path} element={props.element} />
		))
		.flat();
};

export default MultiRoute;
