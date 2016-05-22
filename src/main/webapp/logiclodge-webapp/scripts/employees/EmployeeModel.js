define([
	'lodash',
	'backbone'
], function (_, Backbone) {
	var EmployeeModel = Backbone.Model.extend({
		defaults : {
			id : '',
			name : '',
			dateOfBirth : '',
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

		saveEmployee : function (employee) {
			this.set({
				name : employee.name,
				dateOfBirth : employee.dateOfBirth,
				imageUrl : employee.imageUrl
			});

			this.save(employee);
		},

		url : function () {
			return '/rest/api/employees/' + this.id;
		}
	});

	return EmployeeModel;
});
