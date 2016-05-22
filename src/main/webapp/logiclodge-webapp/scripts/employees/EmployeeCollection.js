define([
	'lodash',
	'backbone',
	'employees/EmployeeModel'
], function (_, Backbone, Model) {

	var EmployeeCollection = Backbone.Collection.extend({

		model : Model,
		url : '/rest/api/employees'

	});

	return EmployeeCollection;
});
