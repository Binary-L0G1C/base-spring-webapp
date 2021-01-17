require.config({ 
	paths : { 
		jquery : '../lib-node/node_modules/jquery/dist/jquery.min',
		'jquery-ui' : '../lib/jquery-ui/jquery-ui.min',
		lodash : '../lib-node/node_modules/lodash/index',
		backbone : '../lib-node/node_modules/backbone/backbone-min',
		backbonews : '../lib-node/node_modules/backbone.ws/backbone-ws',
		text : '../lib-node/node_modules/requirejs-text/text',
		stomp : '../lib-node/node_modules/stompjs/lib/stomp.min.js',
		sockjs : '../lib/sockjs/sockjs.min.js'
	},
	shim : {
		backbone : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		lodash : {
			exports : '_'
		}
	},
	map : {
		'*' : {
			underscore: 'lodash'
		}
	}	
}); 

// Start the main logic.
requirejs([
	'routers/home'
], function (Router) {
	new Router();
});