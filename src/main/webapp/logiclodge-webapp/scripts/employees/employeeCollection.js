define([
	'lodash',
	'backbone',
	'employees/employeeModel'
], function (_, Backbone, Model) {

	var EmployeeCollection = Backbone.Collection.extend({

		model : Model

	});

	return new EmployeeCollection();
});
