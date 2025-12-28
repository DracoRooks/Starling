import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  // characteristics: ["ip.src"],
  rules: [
    // Shield protects the website from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),

    // Create a bot detection rule
    detectBot({
      mode: "LIVE",
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),

    // Rate limiting algorithm
    slidingWindow({
        mode: "LIVE",
        max: 100, // max requests allowed per interval
        interval: 60 // interval duration in seconds
    })
  ],
});

export default aj;