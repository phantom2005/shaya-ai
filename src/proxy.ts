import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSession";

export async function proxy(req:NextRequest){
    const session =await getSession();
    console.log("abe session toh  ",session);
    if(!session){
       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
       }
       return NextResponse.next();// abh har koi dashboard pe nahi ja sakt without session phele login karo fir aao
    }

export const config={
    matcher:'/dashboard/:path*',
}
