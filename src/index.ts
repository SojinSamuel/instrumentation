import { getProjectInfo } from "./utils";
import express from "express";
import Agents from "@fonos/agents";
import Auth from "@fonos/auth";
import faker from "faker";

const app = express();
app.use(express.json());
const port = 3000;

app.get('/instrumentation', async(req, res) => {
  const projectId = req.body.projectId;
  if (!projectId) {
    res.status(405).send("Bad request.");
    return
  }

  try {
    const projectInfo = await getProjectInfo(projectId);
    if (!projectInfo) {
      res.status(404).send("Not found.");
    }
    
    const auth = new Auth();
    const credentials = await auth.createToken({
      accessKeyId: projectInfo.accessKeyId,
      roleName: "USER",
      expiration: "1d"
    })

    const agents = new Agents({
      accessKeyId: projectInfo.accessKeyId,
      accessKeySecret: credentials.token
    });
    const username = faker.internet.userName().toLowerCase();
    const secret = faker.internet.password(10);

    await agents.createAgent({
      name: projectInfo.displayName,
      username,
      secret,
      domains: [projectInfo.sipDomain]
    });

    res.status(200).send({
      signalServer: projectInfo.signalServer,
      eventsServer: projectInfo.signalServer,
      targetAOR:projectInfo.targetAOR,
      didInfo: projectInfo.didInfo,
      sipDomain: projectInfo.sipDomain,
      clientDisplayName: projectInfo.displayName,
      clientUsername: username,
      clientSecret: secret
    })
  } catch(e) {
    console.log(e);
    res.status(500).send("Server error.");
  }
})

app.listen(port, () => {
  console.log(`Service listening at http://localhost:${port}/instrumentation`)
})
