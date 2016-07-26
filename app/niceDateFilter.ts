/// <reference path="./typings/tsd.d.ts"/>
'use strict';

var moment = require('moment');
import h = require('./harassment');

interface Moment {
    format: (m: string) => string;
    diff: (m: Moment, t?: string) => number;
}

export = (): Function => {
    return (incident: h.incident): string => {
        var today: Moment = moment();
        var time: Moment = moment(incident.time);
        var hr: number = incident.time.getHours();
        var date: Moment = moment(incident.date);

        var parts: string[] = [];

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
};
