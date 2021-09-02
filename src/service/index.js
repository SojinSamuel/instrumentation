import express from "express";
const app = express();

app.use(express.json());
const port = 3000;

app.get('/instrumentation', async(req, res) => {
  const instrumentationRequest = {
    instrumentationServer: "",
    projectId: "project001"
  }

  // Validate body
  // Validate request origin
  // Generate instrumentation
  res.send(200);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/instrumentation`)
})
