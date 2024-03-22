import connectMongoDB from "@/libs/mongodb";
import Transaction from "@/models/TransactionModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function PUT(req: any, { params }: any) {
	const { id } = params;
	const { transaction } = await req.json();
	await connectMongoDB();
	await Transaction.findByIdAndUpdate(id, { transaction });
	return NextResponse.json(
		{ message: "Transaction updated!" },
		{ status: 200 }
	);
}

export async function GET(req: any, { params }: any) {
	const { id } = params;
	await connectMongoDB();
	const transaction = await Transaction.findOne({
		transactionId: id,
	});
	return NextResponse.json({ transaction }, { status: 200 });
}
