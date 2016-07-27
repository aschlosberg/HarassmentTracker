/// <reference path="./typings/tsd.d.ts"/>
'use strict';

import h = require('./harassment');

function MapAPIService($rootScope: ng.IScope): h.MapAPIService {
    var _init: boolean = false;

    var srv: h.MapAPIService = {
        init: (): void => {
            console.info('Map API service intialised');
            _init = true;
            $rootScope.$broadcast('MapAPIServiceInit');
        },
        isInit: (): boolean => {
            return _init;
        }
    };

    return srv;
}

MapAPIService.$inject = ['$rootScope'];

export = MapAPIService;
