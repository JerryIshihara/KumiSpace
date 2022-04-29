import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "antd";

import Competition from "./competition";
import { useUser } from "context/user";

const Competitions: React.FC<any> = React.memo(({ competitions }: any) => {
	return (
		<div className="main-page-skills">
			{competitions.map((item: any, index: number) => (
				<Competition
					key={index}
					content={item}
					last={index === competitions.length - 1}
				/>
			))}
		</div>
	);
});

export default Competitions;
