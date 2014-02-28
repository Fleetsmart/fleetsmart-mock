var Poi = Backbone.Model.extend({
 
    defaults:{
        address: '16 Bucklands Avenue',
        Radius: '20',
        Bounds: 'No',
        Applies: 'All',
    },
 
    initialize: function() {}
 
});
 
        

var poi1 = new Poi({ address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' });
var poi2 = new Poi({ address: '16 Bucklands Avenue, Preston', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi3 = new Poi({ address: '3 Hereford Grove, Buckshaw Village', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi4 = new Poi({ address: '17 Argyll Avenue, Buckshaw Village', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi5 = new Poi({ address: '16 Bucklands Avenue', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi6 = new Poi({ address: '16 Bucklands Avenue', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi7 = new Poi({ address: 'Heather Bank, Vicarage Lane', Radius: '50', Bounds: 'No', Applies: 'All' });
var poi8 = new Poi({ address: '16 Bucklands Avenue, Preston', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi9 = new Poi({ address: '3 Hereford Grove, Buckshaw Village', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi10 = new Poi({ address: '17 Argyll Avenue, Buckshaw Village', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi11 = new Poi({ address: '16 Bucklands Avenue', Radius: '20', Bounds: 'No', Applies: 'All' });
var poi12 = new Poi({ address: '16 Bucklands Avenue', Radius: '20', Bounds: 'No', Applies: 'All' });
 
var Poi = Backbone.Collection.extend({
 
    model: Poi,
 
    initialize: function() {}
}); 
 



var poiArray = [poi1, poi2, poi3, poi4, poi5, poi6, poi7, poi8, poi9, poi10, poi11, poi12];
var poi = new Poi(poiArray); 
 

var PoiListView = Backbone.View.extend({
    el: '#poi',
 
    initialize:function(){
        this.render();
    },
    render: function () {
        var source = $('#poi_template').html();
        var template = Handlebars.compile(source);
        var html = template(poi.toJSON());
        this.$el.html(html);
    }
});

var poiListView = new PoiListView();

