/// <reference path="./typings/tsd.d.ts"/>
'use strict';

import h = require('./harassment');

function IncidentService($rootScope: ng.IScope): h.IncidentService {
    var _init: boolean = false;

    var srv: h.IncidentService = {
        init: (): void => {
            console.info('Incident service intialised');
            _init = true;
            $rootScope.$emit('incidentServiceInit');
        },
        isInit: (): boolean => {
            return _init;
        }
    };

    return srv;
}

IncidentService.$inject = ['$rootScope'];

export = IncidentService;
