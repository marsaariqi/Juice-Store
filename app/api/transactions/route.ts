import connectMongoDB from "@/libs/mongodb";
import Transaction from "@/models/TransactionModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: any) {
	try {
		const newTransaction = await req.json();
		await connectMongoDB();
		const createdTransaction = await Transaction.create(newTransaction);
		return NextResponse.json(
			{ message: "Transaction Created!", transaction: createdTransaction },
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Error creating transaction", error },
			{ status: 500 }
		);
	}
}

export async function GET(req: any) {
	try {
		await connectMongoDB();
		const transaction = await Transaction.find();
		return NextResponse.json({ transaction });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Error retrieving transaction", error },
			{ status: 500 }
		);
	}
}
