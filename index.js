const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BN2iWqYnSdhXaR3LLoQE7WTlYscm3nn3LwhyhRjsV-1Psi3McBchBxlZAtRhF6aSC2hHzPab2QuMKGyuDStHMEA";
const privateVapidKey = "WA2aNcvoe6UxhbZFAcAR0bcmE0hNLa_2i0gTCZFpTn8";

webpush.setVapidDetails(
  "mailto:rahmanzahid298@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// subscribe route
app.post("/subscribe", (req, res) => {
  //Get push subcribtion object
  const subscription = req.body;

  // Send create status - 201
  res.status(201).json({});

  // create payload
  const payload = JSON.stringify({ title: "Push test notification" });

  // pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error(error);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
