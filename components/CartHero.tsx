"use client"
import Navbar from '@/components/Navbar'
import { getCartData, CartItem } from '@/libs/getCartData'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cryptoRandomString from 'crypto-random-string';
import { useRouter } from 'next/navigation'

interface CartData {
    cartItems: CartItem[];
}

const CartHero = () => {
    const cartData: CartData = getCartData();
    const [isEmpty, setIsEmpty] = useState(cartData.cartItems.length === 0);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsEmpty(cartData.cartItems.length === 0);
    }, [cartData]);


    const calculateTotalPrice = (cartData: CartData) => {
        return cartData.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    }
    const totalPrice = calculateTotalPrice(cartData);

    const handleCheckout = async () => {
        if (name.length < 3) {
            setNameError(true);
            return;
        }
        setIsSubmit(true);
        const generateId = cryptoRandomString({ length: 12, type: 'alphanumeric' });
        const transactionId = "aw-" + generateId;

        const status = "pending";
        const paymentMethod = "";
        const cartItems = cartData.cartItems;

        const transactionData = {
            transactionId,
            name,
            status,
            paymentMethod,
            totalPrice,
            cartItems,
        };
        try {
            const response = await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData),
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`Transaction Error: ${response.status}`);
            }
            const data = await response.json();
            setIsSubmit(false);
            console.log(transactionId)
            router.push(`/checkout?transactionId=${transactionId}`, { scroll: false });
        } catch (error) {
            console.error("Transaction Error:", error);
        }
    };
    return (
        <>
            <Navbar cartItems={cartData.cartItems} totalPrice={totalPrice} menu={false} />

            <div className='bg-base-200 flex flex-col max-w-lg mx-auto justify-start p-8 h-[90dvh] overflow-auto'>
                <div className='text-4xl text-center font-semibold'>
                    Cart
                </div>
                <span className='divider px-5'></span>

                {isEmpty ? (
                    <>
                        <div className='text-xl text-center font-semibold'>
                            There's no item in the cart.
                        </div>
                        <div className='my-10'>
                            <Link href="/" className='btn btn-secondary w-full rounded-xl'>
                                Back to homepage
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col gap-5'>
                            {cartData.cartItems.map((cart, index) => (
                                <div key={index} className='flex items-center gap-5'>
                                    <div>
                                        <Image src={cart.imageUrl} alt='banana' width={80} height={80} className='border-2' />
                                    </div>
                                    <p className='grow text-2xl text-neutral'>{cart.name}</p>
                                    <div className='flex flex-col'>
                                        <div>
                                            IDR {cart.price}
                                        </div>
                                        <div>
                                            x{cart.qty}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='divider' />
                        <div className='flex justify-between text-lg'>
                            <h1>Subtotal: </h1>
                            <h2 className='font-semibold'>IDR {totalPrice}</h2>
                        </div>
                        <div className='my-10'>
                            <input type="text" placeholder="Name" className={`input input-bordered w-full max-w-xs flex mx-auto ${nameError ? 'border-error' : 'mb-5'}`} value={name} onChange={(e) => { setName(e.target.value), setNameError(false) }} minLength={3} required />
                            {nameError ? (
                                <span className="label-text flex justify-center mb-5 text-error">Name are required.</span>
                            ) : (
                                null
                            )}
                            <button className={`btn btn-secondary w-full rounded-xl ${isSubmit ? 'disabled' : ''}`} onClick={() => handleCheckout()} type='submit'>
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default CartHero