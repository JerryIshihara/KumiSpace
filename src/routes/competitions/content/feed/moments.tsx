import React from "react";
import "../style.less";

import { MomentCard } from "./Card";

import event_img from "../../../../assets/event.png";
import huawei_img from "../../../../assets/photo.jpeg";

const Moments: React.FC = () => {
	return (
		<div className="vertical-center">
			{[...Array(23).keys()].map(i => (
                <MomentCard key={i} img={i % 2 === 0 ? event_img : huawei_img }/>
			))}
		</div>
	);
};

export default Moments;
