// Interface with all the information roxanne needs to operate
export interface Instrumentation {
  signalServer: string;
  eventsServer: string;
  targetAOR: string;
  didInfo: string;
  clientDisplayName: string;
  clientUsername: string;
  clientSecret: string;
  domain: string;
}
