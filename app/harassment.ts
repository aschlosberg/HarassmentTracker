export interface IncidentService {
    init: () => void;
    isInit: () => boolean;
}

export interface navigatorPos {
    coords: {
        latitude: number;
        longitude: number;
        accuracy: number;
    }
}

export interface ReportController {
    back: () => void;
    setLocation: (exact: boolean) => void;
    nextStep: () => void;
    skipToEnd: () => void;
    finish: () => void;
    submit: () => void;
    step: number;
    lastStep: number;
    totalSteps: number;
    incident: incident;
    dateOptions: any;
    when: () => string;
}

export interface incident {
    coords: coords;
    date: Date; // angular-ui-bootstrap states that date and time pickers MUST use different objects
    time: Date;
}

export interface coords {
    lat: number;
    lng: number;
    exact: boolean;
}

//
// interface uiMapCoords {
//     lat: number;
//     lng: number;
// }
//
// interface uiMapMarkerOptions {
//     draggable: boolean;
//     animation: any;
// }
//
// interface uiMapMarker {
//     coords: uiMapCoords;
//     id: string;
//     options?: uiMapMarkerOptions;
// }
//
// interface uiMap {
//     center: uiMapCoords;
//     zoom: number;
//     marker?: uiMapMarker;
// }
//
// interface reportControllerObj {
//     map: uiMap;
// }
