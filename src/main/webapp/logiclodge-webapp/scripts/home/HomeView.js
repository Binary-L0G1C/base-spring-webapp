define([
		'jquery', 
		'lodash',
		'backbone',
		'home/HomeModel',
		'text!home/home.html'
], function ($, _, Backbone, Model, homeTemplate) {
	var HomeView = Backbone.View.extend({
		el : '#main',

		template : _.template(homeTemplate),

		initialize : function () {
			this.model = new Model({
				message: 'Hello Catgirl World!'
			});
		},

		render : function () {
			$(this.el).append(this.template({
				model : this.model.toJSON()
			}));
		}
	});

	return HomeView;
});
