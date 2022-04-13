export const tab_constants = [
	{
		key: "Teams",
        path: "",
        isActive: (tab: string | undefined) => { console.log(!tab); return !tab}
	},
		{
		key: "Pool",
        path: "pool",
        isActive: (tab: string | undefined) => tab === "pool"
	},
	{
		key: "My Team",
        path: "my-team",
        isActive: (tab: string | undefined) => tab === "my-team"
	},

	// {
	// 	key: "Members",
    //     path: "/members",
    //     isActive: (tab: string | undefined) => tab === "members"
	// },
];
