//a demo collection
Samples = new Meteor.Collection("sample");


if (Meteor.isClient) {


    Router.configure({
        layoutTemplate: 'layout'
    });

    Router.map(function () {


        //one home root that maps on /
        this.route("home", {
            path: "/",
            waitOn: function () {
                //subscribe to a collection
                var subs = Meteor.subscribe("oneSample", "sampleId123");
                console.log("in waitOn");
                return  subs;
            },
            data: function () {
                //create the data for the view
                var data = {
                    sample: Samples.findOne()
                };
                console.log("in data:", data);
                return  data;

            }
        });
    });

    Template.home.greeting = function () {

        //this.sample should not be null due to the waitOn method
        return this.sample.text;
    };

}

if (Meteor.isServer) {
    //publish by Id
    Meteor.publish("oneSample", function (id) {
        return Samples.find({_id: id});
    });

    //create a sample entry
    Meteor.startup(function () {
        if (!Samples.find().count()) {
            Samples.insert({
                _id: "sampleId123",
                text: "A sample entry"
            });
        }
    });
}


