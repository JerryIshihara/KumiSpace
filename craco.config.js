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
	devServer: {
		proxy: {
			// "/api": "http://localhost:8000",
			"/api": "http://137.184.229.102:8000",
		},
	},
};
