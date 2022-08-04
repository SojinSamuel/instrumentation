#!/usr/bin/env node
/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Project Fonos
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { getProjectInfo } from "./utils";
import express from "express";
import Agents from "@fonoster/agents";
import Auth from "@fonoster/auth";
import logger from "@fonoster/logger";
import faker from "faker";
import { decode } from "js-base64";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

app.get("/instrumentation/:key", async(req, res) => {
  let projectId: string;
  try {
    projectId = JSON.parse(decode(req.params.key)).projectId;
  } catch(e) {
    logger.error(e);
    res.status(405).send("Bad request. Please double check your instrumentation key.");
    return;
  }

  try {
    const projectInfo = await getProjectInfo(projectId);
    if (!projectInfo) {
      res.status(404).send("Not found.");
      return;
    }

    const auth = new Auth();
    const credentials = await auth.createToken({
      accessKeyId: projectInfo.accessKeyId,
      roleName: "PROJECT",
      expiration: "10m"
    })

    const agents = new Agents({
      accessKeyId: projectInfo.accessKeyId,
      accessKeySecret: credentials.token
    });

    // TODO: Perhaps we should use some pattern that will make it
    // easy to find and delete the account.
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
      eventsServer: projectInfo.eventsServer,
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

app.get("/ping", async(req, res) => {
  res.status(200).send("pong");
})

app.listen(port, () => {
  console.log(`Service listening @ localhost:${port}`)
})
