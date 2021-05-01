import React from "react";
import "./style.less";

interface Props {
    numLines?: number;
    lineHeight?: number;
    style?: React.CSSProperties;
}

const Header: React.FC<Props> = props => {
    const lineHeight = props.lineHeight || 1.5;
    const numLines = props.numLines || 1;
	return (
		<div className="text-ellipsis-container" style={{...props.style, lineHeight: `${lineHeight}em`, height: `${numLines * lineHeight}`, WebkitLineClamp: numLines}}>
			{props.children}
		</div>
	);
};

export default Header;
