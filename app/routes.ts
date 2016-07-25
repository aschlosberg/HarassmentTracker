/// <reference path="./typings/tsd.d.ts"/>
'use strict';

function routes($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

    $urlRouterProvider.otherwise('report');

    $stateProvider
        .state('home',
        {
            url: '/',
            templateUrl: './app/templates/home.html',
            controller: null,
            controllerAs: null
        })
        .state('report',
        {
            url: '/report',
            templateUrl: './app/templates/report.html',
            controller: require('./ReportController'),
            controllerAs: 'report'
        });

}

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export = routes;
