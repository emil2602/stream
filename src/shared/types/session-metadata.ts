export interface LocationMetadata {
    country: string;
    city: string;
    lat: number;
    lng: number;
}

export interface DeviceInfo {
    browser: string
    os: string
    type: string
}

export interface SessionMetadata {
    location: LocationMetadata
    device: DeviceInfo
    ip: string
}

