define([
	'lodash',
	'backbone'
], function (_, Backbone) {
	var EmployeeModel = Backbone.Model.extend({
		defaults : {
			id : '',
			name : '',
			imageUrl : ''
		},

		validate : function (attrs) {
			var errors = {};
			if (!attrs.id) {
				errors.id = 'Id is Required';
			}
			if (!attrs.name) {
				errors.name = 'Name is Required';
			}

			if (!_.isEmpty(errors)) {
				return errors;
			}
		},

		url : function () {
			return 'http://127.0.0.1:8181/rest/api/employees/42';
		}
	});

	return EmployeeModel;
});
