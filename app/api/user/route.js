import { connectMongoDB } from "~/lib/utils/utils";
import User from "../../../models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { wallet_address, bio, x_link } = await request.json();
  await connectMongoDB();
  await User.create({ wallet_address, bio, x_link });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET(request) {
  const { wallet_address } = await request.json();
  await connectMongoDB();
  const user = await User.findOne({ wallet_address }).populate(
    "products_bought products_listed"
  );
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(request) {
  const { wallet_address } = await request.json();
  await connectMongoDB();
  await User.deleteOne({ wallet_address });
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}

// Endpoint to get all users {showing the number of products they have added }

// Endpoint to get a user's details {showing bio and products they have added }
