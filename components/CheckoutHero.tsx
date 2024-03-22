"use client"
import Image from 'next/image'
import Navbar from './Navbar'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CartItem } from '@/libs/getCartData'
import { format } from 'date-fns';

interface TransactionData {
    transaction: {
        _id: string;
        transactionId: string;
        name: string;
        status: string;
        paymentMethod: string;
        totalPrice: number;
        createdAt: Date;
        cartItems: CartItem[];
    };
}
const CheckoutHero = () => {
    const searchParams = useSearchParams()
    const transactionId = searchParams.get('transactionId')
    const [transactionData, setTransactionData] = useState<TransactionData | null>(null);

    const fetchTransactionData = async () => {
        if (!transactionId) return;
        try {

            const response = await fetch(`/api/transactions/${transactionId}`);

            if (!response.ok) {
                throw new Error(`Fetch Error: ${response.status}`);
            }

            const data = await response.json();
            setTransactionData(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchTransactionData();
    }, [transactionId]);

    const formattedDate = transactionData?.transaction?.createdAt
        ? format(new Date(transactionData.transaction.createdAt), 'dd MMM yyyy, hh:mm:ss')
        : '-';
    return (
        <>
            <Navbar cartItems={[]} totalPrice={0} menu={false} />
            <div className='bg-base-200 flex flex-col max-w-lg mx-auto justify-start p-8 h-[90dvh] overflow-auto'>
                <div className='text-4xl text-center mb-5 font-semibold'>
                    Order created.
                </div>
                <div className='border-2 p-5 px-10 shadow-md border-secondary rounded-xl'>
                    <h1 className='text-2xl text-center pb-5 font-semibold'>Transaction details</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <h2>Transaction ID</h2>
                            <span>{transactionId}</span>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Name</h2>
                            <span>{transactionData?.transaction?.name}</span>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Payment Status</h2>
                            <span>{transactionData?.transaction.status}</span>
                        </div>
                        <div className='flex justify-between'>
                            <h2>Date</h2>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                    <span className='divider px-5'></span>
                    <h1 className='text-xl text-start -mt-2 mb-5'>Detail items</h1>
                    <div className='flex flex-col gap-2'>
                        {transactionData?.transaction.cartItems.map((cart, index) => (
                            <div key={index} className='flex items-center gap-5'>
                                <div className=''>
                                    <Image src={cart.imageUrl} alt='banana' width={40} height={40} className='border-2' />
                                </div>
                                <p className='grow text-md text-neutral'>{cart.name}</p>
                                <div className='flex flex-col'>
                                    <p>
                                        {cart.price}
                                    </p>
                                    <p>
                                        x{cart.qty}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <span className='divider px-5'></span>
                    <div className='flex justify-between'>
                        <h2>Total Price</h2>
                        <span>Rp. {transactionData?.transaction.totalPrice}</span>
                    </div>
                </div>
                <div className='my-10'>
                    <Link href="/" className='btn btn-secondary w-full rounded-xl'>
                        Proceed to payment
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CheckoutHero