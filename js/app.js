(function ($) {

    var vehicle = [
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 1' },
        { photo: 'truck', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 2' },
        { photo: 'van', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Idling', speed: '53mph', type: 'Group 3' },
        { photo: 'crane', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Idling', speed: '53mph', type: 'Group 4' },
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Idling', speed: '53mph', type: 'Group 1' },
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 1' },
        { photo: 'truck', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 2' },
        { photo: 'truck', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Idling', speed: '53mph', type: 'Group 2' },
        { photo: 'truck', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Idling', speed: '53mph', type: 'Group 2' },
        { photo: 'truck', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Idling', speed: '53mph', type: 'Group 2' },
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 1' },
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 1' },
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Stopped', speed: '53mph', type: 'Group 1' },
        { photo: 'car', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 1' },
        { photo: 'van', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Stopped', speed: '53mph', type: 'Group 3' },
        { photo: 'van', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 3' },
        { photo: 'van', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'Stopped', speed: '53mph', type: 'Group 3' },
        { photo: 'van', title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'In Transit', speed: '53mph', type: 'Group 3' }
    ];

    //define product model
    var Vehicle = Backbone.Model.extend({
        defaults: {
            photo: "car"
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Vehicle
    });

    //define individual contact view
    var ContactView = Backbone.View.extend({
        tagName: "li",
        className: "",
        template: _.template($("#vehicleTemplate").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    //define master view
    var DirectoryView = Backbone.View.extend({
        el: $(".sideMenu"),

        initialize: function () {
            this.collection = new Directory(vehicle);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            $('#vehicles').find("li").remove();

            _.each(this.collection.models, function (item) {
                this.renderVehicle(item);
            }, this);
        },

        renderVehicle: function (item) {
            var contactView = new ContactView({
                model: item
            });
            $('#vehicles').append(contactView.render().el);

        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("type"));
        },

        getStatus: function () {
            return _.uniq(this.collection.pluck("status"));
        },

        createSelect: function () {
            var select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item,
                    text: item
                }).appendTo(select);
            });
            _.each(this.getStatus(), function (item) {
                var option = $("<option/>", {
                    value: item,
                    text: item
                }).appendTo(select);
            });

            return select;
        },

        //add ui events
        events: {
            "change #filter select": "setFilter",
        },

        //Set filter property and fire change event
        setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //filter the view
        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset(vehicle);
            } 
            else {
                
                this.collection.reset(vehicle, { silent: true });

               if (this.filterType === "In Transit" || this.filterType === "Stopped" || this.filterType === "Idling" ) {
                
                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("status") === filterType;
                    });
                } else {

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type") === filterType;
                    });
                }
                this.collection.reset(filtered);
             } 
        }
    });

    //add routing
    var VehiclesRouter = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter"
        },
    });

    //create instance of master view
    var directory = new DirectoryView();

    //create router instance
    var vehiclesRouter = new VehiclesRouter();

    //start history service
    Backbone.history.start();
} (jQuery));