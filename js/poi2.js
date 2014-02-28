(function ($) {
    var poi = [
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseRED', address: '3 Hereford Grove, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseRED', address: '17 Argyll Avenue, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseYELLOW', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'housePINK', address: '17 Argyll Avenue, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseBLUE', address: '3 Hereford Grove, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseGREEN', address: '17 Argyll Avenue, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseGREEN', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'houseGREEN', address: '3 Hereford Grove, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseGREEN', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseGREEN', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseBLUE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'houseBLUE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseBLUE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseBLUE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseBLUE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseYELLOW', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseYELLOW', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseYELLOW', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All'},
        { photo: 'housePINK', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseORANGE', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseRED', address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' },
        { photo: 'houseRED', address: '17 Argyll Avenue, Buckshaw Village', Radius: '50', Bounds: 'No', Applies: 'All'},
    ];

    //define product model
    var Poi = Backbone.Model.extend({
        defaults: {
            photo: "houseORANGE"
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Poi
    });

    //define individual contact view
    var PoiView = Backbone.View.extend({
        tagName: "li",
        className: "",
        template: _.template($("#poi_template").html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    //define master view
    var DirectoryView = Backbone.View.extend({
        el: $(".sideMenu"),

        initialize: function () {
            this.collection = new Directory(poi);
            this.render();
        },

        render: function () {
            $('#poi').find("li").remove();

            _.each(this.collection.models, function (item) {
                this.renderPoi(item);
            }, this);
        },

        renderPoi: function (item) {
            var poiView = new PoiView({
                model: item
            });
            $('#poi').append(poiView.render().el);
        },
    });

    //create instance of master view
    var directory = new DirectoryView();

    //start history service
    Backbone.history.start();

} (jQuery));