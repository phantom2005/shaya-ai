import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

// REMOVED: import { connect } from "http2"; <--- This was the culprit!

export async function POST(req: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();

    if (!ownerId) {
      return NextResponse.json({ message: "Owner ID is required" }, { status: 400 });
    }

    // Connect to DB only after basic validation
    await connectDb();

    const updateData: any = {};
    if (businessName !== undefined) updateData.businessName = businessName;
    if (supportEmail !== undefined) updateData.supportEmail = supportEmail;
    if (knowledge !== undefined) updateData.knowledge = knowledge;

    const settings = await Settings.findOneAndUpdate(
      { ownerId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: "Success", settings });
  } catch (error: any) {
    // This log is your best friend. Check your VS Code terminal!
    console.error("API ERROR DETAILS:", error.message || error); 
    return NextResponse.json(
      { message: "Internal Server Error", detail: error.message }, 
      { status: 500 }
    );
  }
}