define([
		'jquery', 
		'lodash',
		'backbone',
		'employees/employeeModel',
		'text!employees/employee.html'
], function ($, _, Backbone, Model, employeeTemplate) {
	var View = Backbone.View.extend({
		el : '#main',

		template : _.template(employeeTemplate),

		initialize : function () {
			this.model = new Model();
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render : function () {
			$(this.el).append(this.template({
				model : this.model.toJSON()
			}));
		}
	});

	return new View();
});
