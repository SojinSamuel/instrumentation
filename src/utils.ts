import { ProjectInfo } from "./types";

export async function getProjectInfo(projectId: string): Promise<ProjectInfo> {
  try {
    const projects = require(process.env.CONFIG);
    const result = projects.filter(project => project.projectId === projectId)[0]
    if (!result) {
      throw "Not found"
    }
    return result;
  } catch(e) {
    return null
  }
}
