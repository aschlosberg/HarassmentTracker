/// <reference path="./typings/tsd.d.ts"/>
'use strict';

var angular = require('angular');
var moment = require('moment');
import h = require('./harassment');

declare var google: any;

interface Moment {
    format: (m: string) => string;
    diff: (m: Moment, t?: string) => number;
}

function reportController($scope: ng.IScope, IncidentService: h.IncidentService) {
    var map: any;
    var ctrl = <h.ReportController> this;

    ctrl.incident = {
        coords: null,
        date: new Date(),
        time: new Date()
    }

    ctrl.dateOptions = { // ui.bootstrap.datepicker
        maxDate: new Date() // don't allow future incidents
    }

    ctrl.step = 0;
    ctrl.totalSteps = 3;
    ctrl.back = (): void => {
        ctrl.step = ctrl.lastStep==ctrl.step ? Math.max(0, ctrl.step-1) : ctrl.lastStep; // sometimes we skip ahead; if so then go to lastStep otherwise step-1
        console.info('Back to step: %d', ctrl.step);
    };

    ctrl.setLocation = (exact: boolean): void => {
        var center: any = map.getCenter();
        ctrl.incident.coords = {
            lat: center.lat(),
            lng: center.lng(),
            exact: exact
        };
        console.info('Incident occurred at:');
        console.info(ctrl.incident.coords);
        ctrl.nextStep()
    };

    ctrl.nextStep = (): void => {
        ctrl.lastStep = ctrl.step;
        ctrl.step++;
        if(ctrl.step==ctrl.totalSteps){
            ctrl.finish();
        }
        else {
            console.info('Now at step: %d', ctrl.step);
        }
    };

    ctrl.skipToEnd = (): void => {
        console.debug('Skipping to the end');
        ctrl.lastStep = ctrl.step;
        ctrl.step = ctrl.totalSteps;
        ctrl.finish();
    }

    ctrl.finish = (): void => {
        console.debug('Confirming report details')
    };

    ctrl.submit = (): void => {
        console.info('Submitting report to be saved');
    };

    // clarify date and time to ensure no mix up with noon / midnight and specific days
    ctrl.when = (): string => {
        var today: Moment = moment();
        var time: Moment = moment(ctrl.incident.time);
        var hr: number = ctrl.incident.time.getHours();
        var date: Moment = moment(ctrl.incident.date);

        var parts: string[] = ['at'];

        parts.push(time.format('h:mmA,'));
        if(hr%12==0){
            parts.push('just after');
            parts.push(hr==0 ? 'midnight,' : 'noon,');
        }

        var daysSince = today.diff(date, 'days');
        console.info('Days since incident: %d', daysSince);
        switch(daysSince){
            case 0:
                parts.push('today,');
                break;
            case 1:
                parts.push('yesterday,')
                break;
            default:
                parts.push('on');
        }
        parts.push(moment(date).format('dddd Do MMMM YYYY'));
        return parts.join(' ');
    };

    // Initialise the map either immediately if possible otherwise wait for the incidentServiceInit event to be emitted
    var mapBuilt: boolean = false;
    var buildMap = (): void => {
        if(mapBuilt){
            console.warn('Map already built');
            return;
        }
        mapBuilt = true;
        console.info('Building map');

        var buildAt = (lat: number = 0, lng: number = 0): void => {
            map = new google.maps.Map(document.getElementById('reportMap'), {
                center: {lat: lat, lng: lng},
                zoom: 16
            });

            var marker: any = new google.maps.Marker({
                position: map.getCenter(),
                map: map,
                animation: google.maps.Animation.DROP,
                draggable: false
            });

            map.addListener('center_changed', function(){
                marker.setPosition(map.getCenter());
            });
        };

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos: h.navigatorPos): void => {
                buildAt(pos.coords.latitude, pos.coords.longitude);
            }, (err: any): void => {
                console.warn('navigator.geolocation error ignored; building map at default location');
                console.warn(err);
                buildAt();
            });
        }
        else {
            buildAt();
        }
    }

    if(IncidentService.isInit()){
        buildMap();
    }
    $scope.$on('incidentServiceInit', buildMap);
}

reportController.$inject = ['$scope', 'IncidentService'];

export = reportController;
