import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./welcomeEmailTemplate.js"

export const sendWelcomeEmail = async (email, username, clientURL) => {
    const { data, error } = await resendClient().emails.send({
        from: `${sender().name} <${sender().email}>`,
        to: email,
        subject: "Starling welcomes you!",
        html: createWelcomeEmailTemplate(username, clientURL)
    })

    if(error) {
        throw new Error(`:RESEND_FAILURE: ${error.message}`);
    }

    console.log("[INFO]::RESEND_SENT_EMAIL_SUCCESSFULY:", data);
}