"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getJuiceData } from "@/libs/getJuiceData";
import { getCartData, CartItem } from "@/libs/getCartData";
import Link from "next/link";
import { useDynamicViewportHeight } from '@/utils/helper';
import { useRouter } from "next/navigation";

const juice = [
    { name: 'Banana', src: '/banana.png', price: 15000 },
    { name: 'Orange', src: '/orange.png', price: 12000 },
    { name: 'Strawberry', src: '/strawberry.png', price: 16000 },
    { name: 'Watermelon', src: '/watermelon.png', price: 15000 },
    { name: 'Grape', src: '/grape.png', price: 18000 },
    { name: 'Kiwi', src: '/kiwi.png', price: 14000 }
];

interface CartData {
    cartItems: CartItem[];
}
const Hero = () => {
    const [juiceQuantities, setJuiceQuantities] = useState<number[]>(juice.map(() => 0));
    const [cartItems, setCartItems] = useState<CartData>(getCartData());
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const juiceData = getJuiceData();
    const router = useRouter();
    useDynamicViewportHeight();
    useEffect(() => {
        router.prefetch('/cart')
    }, [router])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const cartData = getCartData();
    //             setCartItems(cartData);
    //         } catch (error) {
    //             console.error('Error fetching cart data:', error);
    //         }
    //     };

    //     fetchData(); // Execute to fetch cart data
    // }, []);

    const handleIncrement = (index: number) => {
        const newQuantities = [...juiceQuantities];
        if (newQuantities[index] < 99) {
            newQuantities[index]++;
            setJuiceQuantities(newQuantities);

            const itemName = juice[index].name;
            const itemPrice = juice[index].price;
            const itemImageUrl = juice[index].src;

            const existingItemIndex = cartItems.cartItems.findIndex((item) => item.name === itemName);

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...cartItems.cartItems];
                updatedCartItems[existingItemIndex].qty++;
                setCartItems({ ...cartItems, cartItems: updatedCartItems });
            } else {
                setCartItems({
                    ...cartItems,
                    cartItems: [...cartItems.cartItems, { name: itemName, price: itemPrice, qty: 1, imageUrl: itemImageUrl }]
                });
            }

            setTotalPrice((prevTotalPrice) => +prevTotalPrice + juice[index].price);
        }
    };

    const handleDecrement = (index: number) => {
        const newQuantities = [...juiceQuantities];
        if (newQuantities[index] > 0) {
            newQuantities[index]--;
            setJuiceQuantities(newQuantities);

            const itemName = juice[index].name;
            const existingItemIndex = cartItems.cartItems.findIndex((item) => item.name === itemName);

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...cartItems.cartItems];
                if (updatedCartItems[existingItemIndex].qty > 1) {
                    updatedCartItems[existingItemIndex].qty--;
                } else {
                    updatedCartItems.splice(existingItemIndex, 1);
                }
                setCartItems({ ...cartItems, cartItems: updatedCartItems });
            }

            setTotalPrice((prevTotalPrice) => +prevTotalPrice - juice[index].price);
        }
    };

    const postCartData = async () => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItems.cartItems)
            });

            if (response.ok) {
                console.log("Data sent successfully!");
            } else {
                throw new Error('Network error when sending cart data');
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }


    return (
        <>
            <Navbar cartItems={cartItems.cartItems} totalPrice={totalPrice} menu={true} />
            <div className='flex max-w-lg mx-auto justify-center p-8 items-start h-[90dvh] overflow-auto'>
                <div className='flex flex-wrap gap-5 items-center justify-evenly mb-10'>
                    {juiceData && juiceData.map((j, index) => (
                        <div key={j._id} className="flex flex-col">
                            <div className='p-2 border-2 border-dashed border-neutral rounded-xl bg-base-100 flex flex-col items-center hover:scale-105 ease-in-out duration-300 shadow-sm'>
                                <Image src={j.imageUrl} alt={j.name} width={100} height={100} className="" />
                                <p className="cursor-default text-sm">{j.name}</p>
                                <p className="cursor-default">IDR {j.price.toString()}</p>
                            </div>
                            <div className="flex bg-secondary w-full items-center justify-center rounded-lg mt-2 h-8 ">
                                <button onClick={() => handleDecrement(index)} className="font-semibold hover:bg-error w-full rounded-l-lg hover:scale-105 ease-in-out h-full duration-100 active:scale-90">-</button>
                                <span className="bg-neutral-50 text-neutral w-full  px-2 h-4/5 text-center pt-[1px] cursor-default">{juiceQuantities[index]}</span>
                                <button onClick={() => handleIncrement(index)} className="font-semibold hover:bg-success w-full rounded-r-lg hover:scale-105 ease-in-out h-full duration-100 active:scale-90">+</button>
                            </div>
                        </div>
                    ))}
                    {cartItems.cartItems.length !== 0 ? (
                        <Link onClick={() => postCartData()} href="/cart" className="btn btn-primary flex justify-between max-w-md active:scale-95 text-lg fixed bottom-10 z-10 w-4/5">
                            <p>{cartItems.cartItems.reduce((total, item) => total + item.qty, 0)} Items</p>
                            <p>IDR {totalPrice}</p>
                        </Link>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Hero