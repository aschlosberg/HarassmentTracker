export interface MapAPIService {
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
    tagLabels: IncidentTagGroups<IncidentTagLabels>;
    toggleTag: (grp: string, idx: number) => void;
    tagStatus: (grp: string, idx: number) => boolean;
    mapIframeSrc: () => any; // get a $sce trusted URL
}

export interface incident {
    multipleVictims: boolean;
    coords: coords;
    date: Date; // angular-ui-bootstrap states that date and time pickers MUST use different objects
    time: Date;
    tags: IncidentTagGroups<IncidentTagStatus>;
    desc?: string;
}

export interface coords {
    lat: number;
    lng: number;
    zoom: number;
    exact: boolean;
}

export interface IncidentTagGroups<T> {
    nature: T;
    motivation: T;
    [index: string]: T;
}

export interface IncidentTagLabels extends Array<string> {}

export interface IncidentTagStatus extends Array<number> {}
