require.config({ 
	paths : { 
		jquery : '../node_modules/jquery/dist/jquery.min',
		'jquery-ui' : '../lib/jquery-ui/jquery-ui.min',
		lodash : '../node_modules/lodash/index',
		backbone : '../node_modules/backbone/backbone-min',
		text : '../node_modules/requirejs-text/text'
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