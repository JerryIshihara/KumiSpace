export const tab_constants = [
	{
		key: "All Teams",
        path: "",
        isActive: (tab: string | undefined) => {return !tab}
	},
	{
		key: "Team You Can Join",
        path: "join",
        isActive: (tab: string | undefined) => tab === "join"
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
