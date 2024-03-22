import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type CartItem = {
	name: string;
	price: number;
	qty: number;
	imageUrl: string;
};
interface CartData {
	cartItems: CartItem[];
}
const getCartData = () => {
	const [cartData, setCartData] = useState<CartData>({ cartItems: [] });

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/cart`);
				if (res.ok) {
					const data = await res.json();
					setCartData(data.cartItems);
				} else {
					throw new Error("Failed to fetch cart data");
				}
			} catch (error) {
				console.error("Error fetching cart data:", error);
			}
		};
		fetchData();
	}, []);

	return cartData;
};

export { getCartData }; // Export the new function
