import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { CartItem } from "@/libs/getCartData";

export type TransactionData = {
	_id: string;
	transactionId: string;
	name: string;
	status: string;
	paymentMethod: string;
	totalPrice: number;
	createdAt: Date;
	cartItems: CartItem[];
};
const getTransactionData = () => {
	const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/transactions`);
				if (res.ok) {
					const data = await res.json();
					setTransactionData(data.transaction);
				} else {
					throw new Error("Failed to fetch education data");
				}
			} catch (error) {
				console.error("Error fetching education data:", error);
			}
		};
		fetchData();
	}, []);

	return transactionData;
};

export { getTransactionData };
