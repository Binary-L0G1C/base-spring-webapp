define([
		'jquery', 
		'lodash',
		'backbone',
		'employees/EmployeeModel',
		'text!employees/employee.html'
], function ($, _, Backbone, Model, employeeTemplate) {
	var EmployeeView = Backbone.View.extend({
		tagName : 'div',

		template : _.template(employeeTemplate),

		initialize : function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render : function () {
			$(this.el).html(this.template({
				model : this.model.toJSON()
			}));
			return this;
		}
	});

	return EmployeeView;
});
