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
                return Meteor.subscribe("oneSample", "sampleId123");
            },
            data: function () {

                //create the data for the view
                return {
                    sample: Samples.findOne()
                };
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


