import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later."});
            } else if(decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied." });
            } else {
                return res.status(403).json({ message: "Access denied due to violation of security policy." });
            }

        }
        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected.",
                message: "Malicious activity detected."
            })
        }

        next();

    } catch (error) {
        console.error("[ERROR]::ARCJET_PROTECTION_MIDDLEWARE_FAILURE:", error);
        // return res.status(500).json({ message: "Internal server error." });
        next();
    }
};