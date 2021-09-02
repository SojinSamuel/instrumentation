import { Instrumentation } from "./types";

/**
 * Instrumentation key is a JWT wich in its payload has everything need to connect to the 
 * instrumentation server, including the endpoint.
 *  
 * @param instrumentationKey 
 * @returns 
 * 
 * TODO: We need to determine how the instrumentation server will trust that client connection
 * comes from the correct domain.
 */
export function getInstrumentation(instrumentationKey: string): Instrumentation {
  // This method obtains needs to obtain the domain from the browser
  // Decodes the instrumentation key
  // Sends the domain name to the instrumentation server defined in the instrumentation key
  // Waits for the instrumentation data
  // Fake instrumentation data
  return {  
    clientDisplayName: "Ugly Roxanne",
    clientUsername: "1001",
    clientSecret: "1234",
    domain: "cola.fonoster.io",
    signalServer: "ws://sip.fonoster.io:5062",
    eventsServer: "ws://localhost:3001",
    targetAOR: "sip:ast@node1",
    didInfo: "9842753568"
  }
}
