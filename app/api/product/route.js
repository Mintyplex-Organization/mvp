import { connectMongoDB } from "../../../lib/utils/utils";
import Product from "../../../models/productModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, description, image, tags } = await request.json();
  await connectMongoDB();
  await Product.create({ name, description, image, tags });
  return NextResponse.json({ message: "Product created" }, { status: 201 });
}

export async function GET(request) {
  const { name } = await request.json();
  await connectMongoDB();
  const product = await Product.findOne({ name });
  return NextResponse.json(product, { status: 200 });
}

// Endpoint for all products getting the required details {Name, Description, Image, Price, Discount, Cartegories, Tags}

export async function DELETE(request) {
  const { name } = await request.json();
  await connectMongoDB();
  await Product.deleteOne({ name });
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
