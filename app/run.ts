/// <reference path="./typings/tsd.d.ts"/>
'use strict';

interface GoogleMapsWindow extends ng.IWindowService {
    initMap: () => void;
}

import h = require('./harassment');

function run($window: GoogleMapsWindow, $rootScope: ng.IScope, IncidentService: h.IncidentService) {
    $window.initMap = (): void => {
        console.info('Google maps API loaded');
        $rootScope.$apply(IncidentService.init);
    }
}

run.$inject = ['$window', '$rootScope', 'IncidentService'];

export = run;
