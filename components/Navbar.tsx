"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { CartItem } from "@/libs/getCartData";
import { TfiReceipt } from 'react-icons/tfi';

interface NavbarProps {
    cartItems: CartItem[];
    totalPrice: number;
    menu: boolean;
}


const Navbar = ({ cartItems, totalPrice, menu }: NavbarProps) => {
    const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
    const postCartData = async () => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItems)
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
        <div className="navbar bg-base-300 max-w-lg mx-auto px-5">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-3xl font-semibold">.Juice</Link>
            </div>
            <div className="flex-none">
                <div>
                    <Link href="/transactions" className={`btn btn-ghost btn-circle mr-2 ${menu ? '' : 'hidden'}`}>
                        <TfiReceipt size={24} />
                    </Link>
                </div>
                <div className={`dropdown dropdown-end ${menu ? '' : 'hidden'}`}>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <IoCartOutline size={24} />
                            <span className="badge badge-sm indicator-item">{totalItems}</span>
                        </div>
                    </div>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">{totalItems} Items</span>
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between pr-8 leading-[0.6rem]">
                                    <span className="text-warning">{item.name}</span>
                                    <span className="text-warning">x{item.qty}</span>
                                </div>
                            ))}

                            <span className="text-info font-semibold">Subtotal: IDR {totalPrice}</span>
                            <div className="card-actions">
                                <Link href="/cart"
                                    onClick={postCartData}
                                    className="btn btn-primary btn-block">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar