import React from "react";
import "App.less";

interface Props {
	icon: React.ReactNode;
	size?: number;
}

const ReactIcon: React.FC<Props> = props => {
	return React.cloneElement(props.icon as React.ReactElement, {
		className: "ant-menu-item-icon",
		style: props.size ? { verticalAlign: "-4%", fontSize: props.size } : { verticalAlign: "-4%" },
	});
};

export default ReactIcon;
