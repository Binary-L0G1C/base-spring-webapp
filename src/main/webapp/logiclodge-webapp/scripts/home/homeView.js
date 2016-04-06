define([
		'jquery', 
		'lodash',
		'backbone',
		'home/homeModel',
		'text!home/home.html'
], function ($, _, Backbone, model, homeTemplate) {
	var View = Backbone.View.extend({
		el: '#main',

		initialize : function () {
			this.model = new model({
				message: 'Hello Catgirl World!'
			});

			this.template = _.template(homeTemplate);
		},

		render : function () {
			$(this.el).append(this.template({
				model : this.model.toJSON()
			}));
		}
	});

	return new View();
});
