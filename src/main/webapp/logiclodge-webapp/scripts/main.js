require.config({ 
	paths : { 
		jquery : '../lib-node/node_modules/jquery/dist/jquery.min',
		'jquery-ui' : '../lib/jquery-ui/jquery-ui.min',
		lodash : '../lib-node/node_modules/lodash/index',
		backbone : '../lib-node/node_modules/backbone/backbone-min',
		text : '../lib-node/node_modules/requirejs-text/text'
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