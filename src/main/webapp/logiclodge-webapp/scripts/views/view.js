define([
		'jquery', 
		'lodash',
		'backbone',
		'models/model',
		'text!templates/main.html'
], function ($, _, Backbone, model, mainTemplate) {
	var View = Backbone.View.extend({
		el: '#main',

		initialize : function () {
			this.model = new model({
				message: 'Hello Catgirl World!'
			});

			this.template = _.template(mainTemplate);
		},

		render : function () {
			$(this.el).append(this.template({
				model : this.model.toJSON()
			}));
		}
	});

	return new View();
});
