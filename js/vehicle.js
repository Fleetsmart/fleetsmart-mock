var VehicleModel = Backbone.Model.extend({


})


var VehicleView = Backbone.View.extend({

	tagName: 'li',
	template: _.template($("#vehicle_template").html()),

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
 
})


