import React, { useEffect, useMemo, useState } from "react";
import { Empty } from "antd";

import Competition from "./competition";
import { useUser } from "context/user";

const Competitions: React.FC<any> = React.memo(({ competitions }: any) => {
	return (
		<div className="main-page-skills">
			{competitions.length === 0 && (
				<Empty
					style={{ marginBottom: 16 }}
					image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
					imageStyle={{
						height: 60,
					}}
					description={<span>You have not joined any competition yet</span>}
				/>
			)}
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
