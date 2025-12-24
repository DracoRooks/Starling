import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("Signup stuff.");
});

router.get("/login", (req, res) => {
    res.send("Login stuff.");
});

router.get("/logout", (req, res) => {
    res.send("Logout stuff.");
});

export default router;