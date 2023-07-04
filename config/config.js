const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = 'development';   //production or development
CONFIG.port = '3033';

if (CONFIG.app === "production") { }
else if (CONFIG.app === "development") { }

module.exports = CONFIG;