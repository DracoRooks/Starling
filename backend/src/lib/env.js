import "dotenv/config";

export const ENV = {
    PORT: process.env.PORT,
    
    MONGO_URI: process.env.MONGO_URI,
    
    JWT_SECRET: process.env.JWT_SECRET,
    
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL,
    
    UPLOAD_CARE_PUBLIC_KEY: process.env.UPLOAD_CARE_PUBLIC_KEY,

    ARCJET_KEY: process.env.ARCJET_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV
};

export const isProduction = process.env.NODE_ENV === "production" ? true : false;
export const isDevelopment = process.env.NODE_ENV === "development" ? true : false;