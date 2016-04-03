require.config({ 
	paths : { 
		jquery : 'lib/jquery-2.2.2.min',
		lodash : 'lib/lodash', 
		backbone : 'lib/backbone-min',
		text : 'lib/text'
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