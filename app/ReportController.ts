/// <reference path="./typings/tsd.d.ts"/>
'use strict';

var angular = require('angular');
var _ = require('underscore');
import h = require('./harassment');

declare var google: any;

function reportController($scope: ng.IScope, IncidentService: h.IncidentService, IncidentTagLabels: h.IncidentTagGroups<h.IncidentTagLabels>, $sce: ng.ISCEService, GoogleMapsAPIKey: string) {
    var map: any;
    var ctrl = <h.ReportController> this;

    ctrl.incident = {
        multipleVictims: false,
        coords: null,
        date: new Date(),
        time: new Date(),
        tags: {
            nature: [],
            motivation: []
        }
    }

    ctrl.tagLabels = IncidentTagLabels;

    // storing tag status as an array of numbers is computationally inefficient (linear-time toggle) but space-wise efficient compared to a hash table
    // running all of this client side for a single click whereas we may store large numbers of incidents server-side
    ctrl.toggleTag = (grp:string, idx: number): void => {
        var status: h.IncidentTagStatus = ctrl.incident.tags[grp];
        var pos: number = _.indexOf(status, idx);
        if(pos == -1){
            status.push(idx);
        }
        else {
            status.splice(pos, 1);
        }
    };

    // see comment for space vs time trade-off of ctrl.toggleTag
    ctrl.tagStatus = (grp: string, idx: number): boolean => {
        var status: h.IncidentTagStatus = ctrl.incident.tags[grp];
        return _.indexOf(status, idx) != -1;
    };

    ctrl.dateOptions = { // ui.bootstrap.datepicker
        maxDate: new Date() // don't allow future incidents
    }

    ctrl.mapIframeSrc = (): any => {
        if(ctrl.incident && ctrl.incident.coords){
            var parts: string[] = ['https://maps.googleapis.com/maps/api/staticmap?key='];
            parts.push(GoogleMapsAPIKey);
            parts.push('&markers=');
            parts.push(ctrl.incident.coords.lat.toString());
            parts.push(',');
            parts.push(ctrl.incident.coords.lng.toString());
            parts.push('&zoom=');
            parts.push(ctrl.incident.coords.zoom.toString());
            parts.push('&size=600x400')
            return $sce.trustAsResourceUrl(parts.join(''));
        }
        else {
            return null;
        }
    }

    ctrl.step = 0;
    ctrl.totalSteps = 3;
    ctrl.back = (): void => {
        ctrl.step = ctrl.lastStep>=ctrl.step ? Math.max(0, ctrl.step-1) : ctrl.lastStep; // sometimes we skip ahead; if so then go to lastStep otherwise step-1
        console.info('Back to step: %d', ctrl.step);
    };

    ctrl.setLocation = (exact: boolean): void => {
        var center: any = map.getCenter();
        ctrl.incident.coords = {
            lat: center.lat(),
            lng: center.lng(),
            zoom: map.getZoom(),
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

reportController.$inject = ['$scope', 'IncidentService', 'IncidentTagLabels', '$sce', 'GoogleMapsAPIKey'];

export = reportController;
