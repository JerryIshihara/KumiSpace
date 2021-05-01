import React, { useEffect, useRef, useState } from "react";

interface Props {
	overlay: React.ReactNode;
}
const OutsideDetector: React.FC<Props> = props => {
	const childRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const overlayRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const [visible, setVisible] = useState(false);
	const [pos, setPos] = useState({top: 0, left: 0});
	useEffect(() => {
		if (visible) {
			document.addEventListener("click", handleClickOutside, true);
		} else {
			document.removeEventListener("click", handleClickOutside, true);
		}
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	});
	const toggleOverlay = () => {
		const { offsetTop, offsetHeight, offsetLeft, /* offsetWidth */} = childRef.current;
		const top = (offsetTop || 0) + (offsetHeight || 0) + 5;
		const left = (offsetLeft || 0) /* - (overlayWidth - offsetWidth) */;
		setPos({ top: top, left: left });
		setVisible(!visible);
	};
	const handleClickOutside = (event: MouseEvent) => {
		const node = event.target as Node;
		if (
			childRef &&
			overlayRef &&
			!childRef.current.contains(node) &&
			!overlayRef.current.contains(node)
		) {
			setVisible(false);
		}
	};
	return (
		<>
			<div ref={childRef} onClick={toggleOverlay}>{props.children}</div>
			{visible && <div ref={overlayRef} style={{ zIndex: 999, position: "fixed", ...pos }}>{props.overlay}</div>}
		</>
	);
};

export default OutsideDetector;
