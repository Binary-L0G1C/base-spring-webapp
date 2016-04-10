define([
	'lodash',
	'backbone',
	'employees/EmployeeModel'
], function (_, Backbone, Model) {

	var EmployeeCollection = Backbone.Collection.extend({

		model : Model,
		url : 'http://127.0.0.1:8181/rest/api/employees'

	});

	return EmployeeCollection;
});
