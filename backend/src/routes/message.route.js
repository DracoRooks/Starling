import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
    res.send("Message sending.");
});

router.get("/receive", (req, res) => {
    res.send("Message receiving.");
});

export default router;