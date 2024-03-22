import connectMongoDB from "@/libs/mongodb";
import CartItem from "@/models/CardItemsModel";
import { NextResponse } from "next/server";

export async function POST(req: any) {
	const newCartItems = await req.json();
	await connectMongoDB();
	try {
		await CartItem.findOneAndUpdate(
			{},
			{ $set: { cartItems: newCartItems } },
			{ upsert: true }
		);
		return NextResponse.json(
			{ message: "Cart updated successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Error updating cart" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	await connectMongoDB();

	try {
		const cartItems = await CartItem.findOne().select("cartItems");
		return NextResponse.json({ cartItems });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Error fetching cart items" },
			{ status: 500 }
		);
	}
}
