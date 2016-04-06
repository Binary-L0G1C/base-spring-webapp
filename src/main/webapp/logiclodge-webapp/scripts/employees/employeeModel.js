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
		}
	});

	return EmployeeModel;
});
