import React from "react";
import "./style.less";

import { useNavigate } from "react-router-dom";

interface Props {
	style?: React.CSSProperties;
	href?: string;
}

const Logo: React.FC<Props> = props => {
	const navigate = useNavigate();
	return (
		<div
			className="logo"
			style={props.style}
			onClick={() => {
				if (props.href) {
					navigate(props.href);
				}
			}}
		>
			<span>
				<span style={{ color: "#039dfc" }}>Kumi</span>Space
			</span>
		</div>
	);
};

export default Logo;
