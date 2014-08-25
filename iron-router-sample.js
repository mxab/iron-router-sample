Samples = new Meteor.Collection("sample");


if (Meteor.isClient) {


    Router.configure({
        layoutTemplate: 'layout'
    });

    Router.map(function () {

        this.route("home", {
            path: "/",
            waitOn: function () {

                return Meteor.subscribe("oneSample", "sampleId123");
            },
            data: function () {
                return {
                    sample: Samples.findOne()
                };
            }
        });
    });

    Template.home.greeting = function () {
        return this.sample.text;
    };

}

if (Meteor.isServer) {
    Meteor.publish("oneSample", function (id) {
        return Samples.find({_id: id});
    });
    Meteor.startup(function () {
        if (!Samples.find().count()) {
            Samples.insert({
                _id: "sampleId123",
                text: "A sample entry"
            });
        }
    });
}


