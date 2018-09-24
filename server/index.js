const PORT = 8080;
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const users = require('./api/users')
module.exports = app;

const createApp = () => {
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', users);

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

async function bootApp() {
  await createApp();
  await startListening();
}

bootApp();
