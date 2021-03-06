(function ($) {

// data
var vehicles = [
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'New Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'Old Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'New Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'Old Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'New Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'New Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'New Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'Old Server' },
    { title: '12345', location: 'wigan', date: '21/01/14', time: '05:45', status: 'in transit', speed: '53mph', group: 'Old Server' }
];
            

//define product model
var Contact = Backbone.Model.extend({
    defaults: {
        photo: "/img/placeholder.png"
    }
});

//define directory collection
var Directory = Backbone.Collection.extend({
    model: Contact
});

//define individual contact view
var ContactView = Backbone.View.extend({
    tagName: "article",
    className: "contact-container",
    template: _.template($("#contactTemplate").html()),

render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
 }
});

//define master view
var DirectoryView = Backbone.View.extend({
    el: $("#vehicles"),
    initialize: function () {
        this.collection = new Directory(vehicles);

        this.render();
        this.$el.find("#filter").append(this.createSelect()); 

        this.on("change:filterType", this.filterByType, this);
        this.collection.on("reset", this.render, this);
    },

    render: function () {
        this.$el.find("article").remove();

        _.each(this.collection.models, function (item) {
        this.renderContact(item);
    }, this);
},

renderContact: function (item) {
    var contactView = new ContactView({
        model: item
    });
    this.$el.append(contactView.render().el);
},

getTypes: function () {
    return _.uniq(this.collection.pluck("type"));
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

    return select;
 },

//add ui events
events: {
    "change #filter select": "setFilter"
},

//Set filter property and fire change event
setFilter: function (e) {
    this.filterType = e.currentTarget.value;
    this.trigger("change:filterType");
},

//filter the view
filterByType: function () {
    if (this.filterType === "all") {
        this.collection.reset(vehicles);
        vehiclesRouter.navigate("filter/all");
    } else {
        this.collection.reset(vehicles, { silent: true });

        var filterType = this.filterType,
            filtered = _.filter(this.collection.models, function (item) {
            return item.get("type") === filterType;
        });

        this.collection.reset(filtered);

        vehiclesRouter.navigate("filter/" + filterType);
    }
}
});

//add routing
var vehiclesRouter = Backbone.Router.extend({
    routes: {
         "filter/:type": "urlFilter"
    },

    urlFilter: function (type) {
        directory.filterType = type;
        directory.trigger("change:filterType");
    }
});

//create instance of master view
var directory = new DirectoryView();

//create router instance
var vehiclesRouter = new vehiclesRouter();

//start history service
Backbone.history.start();

} (jQuery));