define([
		'jquery', 
		'lodash',
		'backbone',
		'home/HomeModel',
		'text!home/home.html',
		'backbonews'
], function ($, _, Backbone, Model, homeTemplate) {
	var HomeView = Backbone.View.extend({
		el : '#main',

		template : _.template(homeTemplate),

		initialize : function () {
			var that = this;

			this.model = new Model({
				message : 'Hello Catgirl World!'
			});


			this.ws = new Backbone.WS('ws://127.0.0.1:8080/base-spring-websocket-server/echo', {expect: 'update'});

			this.ws.ready.then(function (instance) {
					console.log('On air!');
					that.ws.bind(that.model, { 'ws:message:update': that.model.set });
					that.ws.send(47);
				}, function (error) {
					console.error('Failed to connect!', error);
			});

			this.model.on('ws:message:update', function (data) {
				console.log(data);
			});

			window.setTimeout(function() {
				console.log(that.model.get('answer'));
			}, 1000);

			var expectation = this.ws.expect();
			expectation.promise.then(
				function (data, type) {
					console.log(data, type);
				},
				function () {
					console.error('timeout for response to `some_topic` reached');
				});
			
		},

		render : function () {
			$(this.el).append(this.template({
				model : this.model.toJSON()
			}));
		}
	});

	return HomeView;
});
