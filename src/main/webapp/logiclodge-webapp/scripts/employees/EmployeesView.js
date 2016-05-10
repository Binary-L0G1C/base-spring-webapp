define([
		'jquery',
		'lodash',
		'backbone',
		'employees/EmployeeView',
		'employees/EmployeeCollection',
		'jquery-ui'
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

			$( '#date' ).datepicker();
		},

		render : function () {
			this.$el.html('');
			this.collection.each(function(employee) {
				var employeeView = new EmployeeView({model : employee});
				this.$el.append(employeeView.render().el);
			}, this);

			$( '.employee' ).accordion({
				collapsible : true,
				active : false,
				heightStyle: 'content'
			});

			$( '.editEmployeeButton' ).button({
				icons: {
					secondary: "ui-icon-pencil"
				}
			});
		}
	});

	return EmployeesView;
});
