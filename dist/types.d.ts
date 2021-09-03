export interface Instrumentation {
    signalServer: string;
    eventsServer: string;
    targetAOR: string;
    didInfo: string;
    clientDisplayName: string;
    clientUsername: string;
    clientSecret: string;
    sipDomain: string;
}
export interface ProjectInfo {
    projectId: string;
    accessKeyId: string;
    sipDomain: string;
    eventsServer: string;
    signalServer: string;
    targetAOR: string;
    displayName: string;
    didInfo: string;
}
