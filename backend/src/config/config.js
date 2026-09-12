export const PORT = process.env.PORT;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

export const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
export const BUSINESS_EMAIL_PASSWORD = process.env.BUSINESS_EMAIL_PASSWORD;

export const GOOGLE_CLIENT = {
       ID: process.env.GOOGLE_CLIENT_ID_WEB,
       SECRET: process.env.GOOGLE_CLIENT_SECRET_WEB
};

export const AUTH_OTP_EXPIRY = Number(process.env.AUTH_OTP_EXPIRY);

export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;