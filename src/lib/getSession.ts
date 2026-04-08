// src/lib/getSession.ts
import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    // 1. Validate the token and get the claims
    const result = await scalekit.validateToken(token) as { sub: string } | null;
    if (!result || !result.sub) return null;

    // 2. Fetch the user profile using the user client
    // In Scalekit SDK, user methods are nested under 'user'
    const user = await scalekit.user.getUser(result.sub);
    
    return user; 
  } catch (error) {
    console.error("Session validation failed:", error);
    return null;
  }
}