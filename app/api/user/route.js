import { NextResponse } from "next/server";
import connectDB from "../lib/db";
import { response } from "../lib/helper";
import User from "../models/User";

connectDB();

export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.log(error, "+++++");
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    console.log("formData: ", formData);

    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("file");

    const user = new User();
    user.email = email;
    user.password = password;
    user.file = file;
    const savedResponse = await user.save();
    return NextResponse.json(
      response(200, "Saved successfully", savedResponse)
    );
  } catch (error) {
    console.log(error, "++++++++++++++++");
    return NextResponse.json(response(400, "Bad Request", error));
  }
}
