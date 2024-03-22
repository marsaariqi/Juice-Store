import connectMongoDB from "@/libs/mongodb";
import Juice from "@/models/JuiceModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: any) {
	try {
		const newJuice = await req.json();
		await connectMongoDB();
		const createdJuice = await Juice.create(newJuice);
		return NextResponse.json(
			{ message: "Juice Created!", juice: createdJuice },
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Error creating juice", error },
			{ status: 500 }
		);
	}
}

export async function GET(req: any) {
	try {
		await connectMongoDB();
		const juices = await Juice.find();
		return NextResponse.json({ juices });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Error retrieving juices", error },
			{ status: 500 }
		);
	}
}
