define([
		'jquery', 
		'lodash',
		'backbone',
		'employees/EmployeeView',
		'employees/EmployeeCollection'
], function ($, _, Backbone, EmployeeView, Collection) {
	var EmployeesView = Backbone.View.extend({
		el : '#main',

		initialize : function () {
			this.collection = new Collection();
			this.collection.fetch();

			this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'destroy', this.remove);
			this.listenTo(this.collection, 'visible', this.toggleVisible);
		},

		render : function () {
			this.$el.html('');
			this.collection.each(function(employee) {
				var employeeView = new EmployeeView({model : employee});
				this.$el.append(employeeView.render().el);
			}, this);
		}
	});

	return EmployeesView;
});
