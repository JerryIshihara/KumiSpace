export const tab_constants = [
	{
		key: "Teams",
        path: "",
        isActive: (tab: string | undefined) => { console.log(!tab); return !tab}
	},
	// {
	// 	key: "Moments",
    //     path: "/moments",
    //     isActive: (tab: string | undefined) => tab === "moments"
	// },
	// {
	// 	key: "Events",
    //     path: "/events",
    //     isActive: (tab: string | undefined) => tab === "events"
	// },
	// {
	// 	key: "Members",
    //     path: "/members",
    //     isActive: (tab: string | undefined) => tab === "members"
	// },
];
