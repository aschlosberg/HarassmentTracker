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
    .constant('GoogleMapsAPIKey', 'AIzaSyDyJQZcqHIBHZjYEED-1-8MQaQlZ0qPyeM')
    .filter('niceDate', require('./niceDateFilter'))
    .filter('commaListedTags', require('./commaListedTagsFilter'))
    .factory('IncidentService', require('./IncidentService'))
    .run(require('./run'));

angular.bootstrap(document, ['harassment'], { strictDi: true });
