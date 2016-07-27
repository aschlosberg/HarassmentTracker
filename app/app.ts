/// <reference path="./typings/tsd.d.ts" />
'use strict';

var angular: ng.IAngularStatic = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

angular.module('harassment',[
    'ui.router',
    'ui.bootstrap'
])
    .config(require('./routes'))
    .constant('IncidentTagLabels', require('./IncidentTagLabels'))
    .constant('GoogleMapsAPIKey', 'AIzaSyDyJQZcqHIBHZjYEED-1-8MQaQlZ0qPyeM') // client-side key so no way to store it in ENV and no point in excluding it from the repo
    .filter('niceDate', require('./niceDateFilter'))
    .filter('commaListedTags', require('./commaListedTagsFilter'))
    .factory('MapAPIService', require('./MapAPIService'))
    .run(require('./run'));

angular.element(document).ready(() => { // although we use 'defer' in the script tag, include this for browsers that don't support it
    angular.bootstrap(document, ['harassment'], { strictDi: true });
});
