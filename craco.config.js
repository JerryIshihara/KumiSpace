const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
	plugins: [
		{
			plugin: CracoAntDesignPlugin,
			options: {
				customizeTheme: {
					"@primary-color": "#e02d6f",
					"@text-selection-bg": "#1890ff",
				},
			},
		},
	],
};
