import { Resend } from "resend";
import { ENV } from "./env.js";

export const resendClient = () => {
    const { RESEND_API_KEY } = ENV;
    if(!RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY enviroment variable not set.");
    }
    return new Resend(RESEND_API_KEY);
}

export const sender = () => {
    const { EMAIL_FROM, EMAIL_FROM_NAME } = ENV;
    if(!EMAIL_FROM) {
        throw new Error("EMAIL_FROM enviroment variable not set.");
    }
    if(!EMAIL_FROM_NAME) {
        throw new Error("EMAIL_FROM_NAME enviroment variable not set.");
    }

    return {
        email: EMAIL_FROM,
        name: EMAIL_FROM_NAME
    };
}