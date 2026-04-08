// src/lib/scalekit.ts
import { Scalekit } from '@scalekit-sdk/node';

const envUrl = process.env.SCALEKIT_ENVIRONMENT_URL;
const clientId = process.env.SCALEKIT_CLIENT_ID;
const clientSecret = process.env.SCALEKIT_CLIENT_SECRET;

if (!envUrl || !clientId || !clientSecret) {
  throw new Error("Missing Scalekit Environment Variables. Check your .env file.");
}

export const scalekit = new Scalekit(envUrl, clientId, clientSecret);