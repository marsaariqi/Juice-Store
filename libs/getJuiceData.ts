import { useState, useEffect } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Juice {
	_id: string;
	name: string;
	price: Number;
	imageUrl: string;
}

const getJuiceData = () => {
	const [juiceData, setJuiceData] = useState<Juice[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${baseUrl}/api/juice`);
				if (res.ok) {
					const data = await res.json();
					setJuiceData(data.juices);
				} else {
					throw new Error("Failed to fetch education data");
				}
			} catch (error) {
				console.error("Error fetching education data:", error);
			}
		};
		fetchData();
	}, []);

	return juiceData;
};

export { getJuiceData };
