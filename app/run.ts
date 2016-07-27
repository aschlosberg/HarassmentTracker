/// <reference path="./typings/tsd.d.ts"/>
'use strict';

interface GoogleMapsWindow extends ng.IWindowService {
    initMap: () => void;
}

import h = require('./harassment');

function run($window: GoogleMapsWindow, $rootScope: ng.IScope, MapAPIService: h.MapAPIService, GoogleMapsAPIKey: string) {
    $window.initMap = (): void => {
        console.info('Google maps API loaded');
        $rootScope.$apply(MapAPIService.init);
    }
    var maps = document.createElement('script');
    maps.src = 'https://maps.googleapis.com/maps/api/js?key='+GoogleMapsAPIKey+'&callback=initMap';
    document.body.appendChild(maps);
}

run.$inject = ['$window', '$rootScope', 'MapAPIService', 'GoogleMapsAPIKey'];

export = run;
