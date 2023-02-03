require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-kiaZZ24oItPgb5dff6rlZ8O0",
  apiKey: process.env.OPENAI_API_KEY,
});

// create a simple express api that calls the function above
const openai = new OpenAIApi(configuration);

const app = express();
// adding corse to express

app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message, "message");
  // const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    // data: response from data,
    message: response.data.choices[0].text,
  });
}),
  app.get("/models", async (req, res) => {
    const response = await openai.listEngines();
    console.log(response.data.data);
    res.json({
      models: response.data.data,
    });
  }),
  app.listen(port, () => {
    console.log(`listen app
     example at http://localhost:${port}`);
  });
