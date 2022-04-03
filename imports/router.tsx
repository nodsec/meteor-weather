import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from "react";
import {mount, withOptions} from "react-mounter";
// @ts-ignore
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import App from "./ui/App";


FlowRouter.wait();
Tracker.autorun(function () {
    const shouldInitializeRouter =
        Meteor.subscribe('meteo').ready() &&
        Meteor.subscribe('shmu_warnings').ready() &&
        //Meteor.subscribe('shmu_weather').ready() &&
        !FlowRouter._initialized; // eslint-disable-line no-underscore-dangle

    console.log('BBB')
    if (shouldInitializeRouter) {
        console.log('EEEEE')
        FlowRouter.initialize();
    }
});

const reactMount = withOptions({
    rootProps: {
        id: "react-root"
    }
}, mount);

const publicRoutes = FlowRouter.group({
    name: 'public'
});

const noLoggedRoutes = FlowRouter.group({
    name: 'noLogged',
    triggersEnter: [(context, redirect) => {
        console.log('1111');
    }],
});

const loggedRoutes = FlowRouter.group({
    name: 'logged'
});


noLoggedRoutes.route('/', {
    name: 'home',
    action: function (routeParams, routeQuery) {
        import("./ui/Home").then((page) => {
            const HomePage = page.default;
            reactMount(App, {
                content: (
                    <HomePage routeParams={routeParams}/>
                )
            });
        });
    }
});
