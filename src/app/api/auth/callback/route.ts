import { NextRequest, NextResponse } from "next/server";
import { scalekit } from "@/lib/scalekit";
// Assuming scalekit is imported/initialized elsewhere in your project
// import { scalekit } from "@/lib/scalekit"; 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

  if (!code) {
    return NextResponse.json({ message: "Missing code" }, { status: 400 });
  }

  try {
    const session = await scalekit.authenticateWithCode(code, redirectUri);
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);

    // 1. Fixed typo: "access_token" (was "acess_token")
    // 2. Fixed maxAge: Next.js cookies.set expects seconds, not milliseconds.
    response.cookies.set("access_token", session.accessToken, {
      httpOnly: true,
      secure:false,
      // sameSite: "lax", // Recommended for OAuth redirects
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours in seconds
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(new URL("/login?error=auth_failed", process.env.NEXT_PUBLIC_APP_URL));
  }
}