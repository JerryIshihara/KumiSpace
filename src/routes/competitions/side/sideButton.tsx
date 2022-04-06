import React from "react";
import "./style.less";

import { Space } from "antd";

const FONT_SIZE = { small: 16, medium: 20, large: 24 };

interface Props {
	size?: "small" | "medium" | "large";
	icon: React.ReactNode;
	text: React.ReactNode;
}

const SideButton: React.FC<Props> = props => {
	return (
		<div
			className="strm-side-button"
			style={{ fontSize: FONT_SIZE[props.size || "medium"] }}
		>
			<Space size={24}>
				{props.icon}
				{props.text}
			</Space>
		</div>
	);
};

export default SideButton;
