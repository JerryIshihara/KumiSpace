import React from "react";

interface InputItemProps {
	label: string;
	style?: React.CSSProperties;
	className?: string;
	errorMessage?: string;
}

const FormItem: React.FC<InputItemProps> = props => {
	return (
		<div
			className={props.className}
			style={{ ...props.style, display: "flex", flexDirection: "column" }}
		>
			<p style={{ marginBottom: 2 }}>
				{props.label}
				{props.errorMessage && <span style={{color: 'red', marginLeft: 4}}>{props.errorMessage}</span>}
			</p>{" "}
			{props.children}
		</div>
	);
};

export default FormItem;
