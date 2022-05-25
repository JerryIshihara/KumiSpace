const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
	plugins: [
		{
			plugin: CracoAntDesignPlugin,
			options: {
				customizeTheme: {
					"@primary-color": "#ed2f5f",
					"@text-selection-bg": "#1890ff",
				},
			},
		},
	],
	// devServer: {
	// 	proxy: {
	// 		// use IP address instead of localhost!
	// 		// "/api": "http://192.168.2.12:8000",
	// 		"/api": "http://137.184.229.102:8000",
	// 	},
	// },
};
