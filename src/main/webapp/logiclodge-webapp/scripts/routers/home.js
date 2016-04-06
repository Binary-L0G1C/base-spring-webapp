define([
	'jquery', 
	'lodash',
	'backbone', 
	'home/homeView'], 
function ($, _, Backbone, homeView) {
	var Router = Backbone.Router.extend({
		initialize : function () {
			this.homeView = homeView;
			Backbone.history.start();
		},

		routes : {
			'' : 'home'
		},

		home : function () {
			this.homeView.render();
		}
	});

	return Router;
});
