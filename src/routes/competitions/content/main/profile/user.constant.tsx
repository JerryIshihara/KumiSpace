export const tab_constants = [
	{
		key: "Skills",
        path: "",
        isActive: (tab: string | undefined) => { return !tab}
	},
	{
		key: "Competitions",
        path: "/competitions",
        isActive: (tab: string | undefined) => tab === "competitions"
	},
	// {
	// 	key: "Clubs",
    //     path: "/clubs",
    //     isActive: (tab: string | undefined) => tab === "clubs"
	// },
	// {
	// 	key: "Events",
    //     path: "/events",
    //     isActive: (tab: string | undefined) => tab === "events"
	// },
	// {
	// 	key: "Follows",
    //     path: "/follows",
    //     isActive: (tab: string | undefined) => tab === "follows"
	// },
];
