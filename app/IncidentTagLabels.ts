/// <reference path="./typings/tsd.d.ts"/>
'use strict';

import h = require('./harassment');

var groups: h.IncidentTagGroups<h.IncidentTagLabels> = {
    nature: [
        'physically assaulted',
        'verbally abused',
    ],
    motivation: [
        'homophobic',
        'racist',
        'sexual',
        'transphobic'
    ]
};

export = groups;
