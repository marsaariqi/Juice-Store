"use client"
import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"
import { IoMdArrowRoundBack } from "react-icons/io"
import { getTransactionData } from "@/libs/getTransactionData"
import { format, addHours } from 'date-fns';

const TransactionHero = () => {
    const transactionData = getTransactionData();

    return (
        <>
            <Navbar cartItems={[]} totalPrice={0} menu={false} />
            <div className='text-4xl text-center font-semibold flex justify-between bg-base-200 sticky top-0 z-10 py-3 shadow-sm items-center'>
                <Link href="/" className="btn btn-ghost btn-circle ml-5">
                    <IoMdArrowRoundBack size={34} />
                </Link>
                <h1 className="grow pr-10">
                    Transactions
                </h1>
            </div>
            <div className='bg-base-200 flex flex-col max-w-lg mx-auto justify-start px-8 pb-8 h-[90dvh] overflow-auto overflow-x-hidden'>
                <span className='divider px-5'></span>
                <div className="flex flex-col gap-4">
                    {transactionData.toReversed().map((transaction) => (
                        <div key={transaction._id} className='border-2 p-5 px-10 shadow-md border-warning rounded-xl'>
                            <h1 className='text-2xl text-center pb-5 font-semibold'>Transaction details</h1>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <h2>Transaction ID</h2>
                                    <span>{transaction.transactionId}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <h2>Name</h2>
                                    <span>{transaction.name}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <h2>Payment Status</h2>
                                    <span className={`${transaction.status === 'success' ? 'text-info' : 'text-warning'}`}>{transaction.status}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <h2>Date</h2>
                                    <span>{format(new Date(transaction.createdAt), 'dd MMM yyyy, hh:mm:ss')}</span>
                                </div>
                            </div>
                            <span className='divider px-5'></span>
                            <h1 className='text-xl text-start -mt-2 mb-5'>Detail items</h1>
                            <div className='flex flex-col gap-2'>
                                {transaction.cartItems.map((cart, index) => (
                                    <div key={index} className='flex items-center gap-5'>
                                        <div className=''>
                                            <Image src={cart.imageUrl} alt='banana' width={40} height={40} className='border-2' />
                                        </div>
                                        <p className='grow text-md text-neutral'>{cart.name}</p>
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
                            <span className='divider px-5'></span>
                            <div className='flex justify-between'>
                                <h2>Total Price</h2>
                                <span>IDR {transaction.totalPrice}</span>
                            </div>
                            {transaction.status === 'success' ? (
                                null
                            ) : (
                                <div className='mt-10'>
                                    <Link href="/" className='btn btn-warning w-full rounded-xl'>
                                        Proceed to payment
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TransactionHero