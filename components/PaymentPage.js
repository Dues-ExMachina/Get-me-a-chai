"use client"
import Image from 'next/image'
import { useCallback } from 'react'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'

const PaymentPage = () => {
    const [paymentform, setPaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    });

    const [currentuser, setcurrentuser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    // ✅ MOVED a a-zA-Z - username is now declared at the top.
    const pathname = usePathname()
    const username = pathname.split('/')[1]


    const getDate = useCallback(async () => {
        let u = await fetchuser(username);
        setcurrentuser(u);
        let dbp = await fetchpayments(username);
        setPayments(dbp);
    }, [username]); // ✅ This is now safe.

    useEffect(() => {
        getDate();
    }, [getDate]);

    //Show a success toast when payment is done
    useEffect(() => {
        if (searchParams.get('paymentDone') === 'true') {
            toast.success('Payment done!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            // Redirect to clear the query param and prevent the toast on refresh
            router.push(`/${username}`);
        }
    }, [searchParams, router, username]); // ✅ This is now safe.


    function handleChange(e) {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const { data: session, status } = useSession()

    // get the orderID
   const payment = async (amount) => {
    if (!username) return;

    // ✅ WRAP THE SERVER ACTION CALL IN A try...catch BLOCK
    try {
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id;

        var options = {
            "key": currentuser.Razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Buy me a Chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "prefill": {
                "name": paymentform.name || session?.user?.name || "",
                "email": session?.user?.email || "",
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
            handler: async function (response) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/razorpay`, {
                    method: 'POST',
                    body: new URLSearchParams({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                });

                const data = await res.json();

                if (data.success) {
                    router.push(`/${username}?paymentDone=true`);
                } else {
                    toast.error("Payment verification failed.");
                }
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    } catch (error) {
        // This will catch the error from the server action and display it
        console.error("Payment initiation failed:", error);
        toast.error(error.message); // e.g., "This creator has not set up payments yet."
    }
};

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
            </div>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

            <div className="w-full relative">
  {/* Cover Image */}
  <div className="relative w-full h-40 md:h-[35vh]"> 
    <Image
      src={currentuser?.coverpic || '/images/cover.jpg'}
      alt="Cover image"
      fill
      className="object-cover"
      unoptimized
      priority
    />
  </div>

  {/* Profile Picture */}
  <div className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 h-20 w-20 md:h-24 md:w-24">
    <Image
      src={currentuser?.profilepic || '/images/profile2.jpg'}
      alt="Profile"
      width={96}
      height={96}
      className="rounded-full object-cover border-4 border-white shadow-md w-full h-full"
      unoptimized
    />
  </div>
</div>

            {/* Details section rendered below */}
            <div className='details text-center mt-16 md:mt-14 text-white flex flex-col items-center gap-1'>
                <div className='text-3xl font-bold'>@{username}</div>
                <div className='text-slate-400'>Lets help {username} to get a chai</div>
                <div className='text-slate-400'>{payments.length} Payments · {currentuser.name} has bought: {Math.floor(payments.reduce((acc, pay) => acc + pay.amount, 0) / 20)} Chai · since {new Date(currentuser.createdAt).toLocaleDateString()} </div>

                <div className="payments flex gap-3 w-[80vw] md:w-[80vw] justify-center mt-4 mb-20 flex-col md:flex-row">
                    <div className="supporters bg-slate-900 w-full md:w-1/2 rounded-lg p-4 md:p-10">
                        <h2 className='text-white mb-5 text-left text-2xl font-bold my-5'>Top 5 Supporters</h2>
                        <ul className='mx-5 text-white text-left'>
                            {payments.length === 0 && (
                                <div className='text-center text-gray-500'>No payments made yet.</div>)}
                            {[...payments]
                                .sort((a, b) => b.amount - a.amount)
                                .slice(0, 5)
                                .map((pay, index) => {
                                    return (
                                        <li key={index} className='my-2 flex gap-2 items-center'>
                                            <Image
                                                src="/images/avatar.gif"
                                                alt="avatar"
                                                width={32}
                                                height={32}
                                                className="w-8"
                                            />
                                            <span>
                                                {pay.name} donated <span className='font-bold'>₹{pay.amount}</span> with a message- {pay.message}
                                            </span>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="pay bg-slate-900 w-full md:w-1/2 rounded-lg p-2 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col mb-5 p-2 md:p-0'>
                            <input
                                name="name"
                                onChange={handleChange}
                                type="text"
                                value={paymentform.name}
                                className='w-full p-3 rounded-lg bg-slate-800'
                                placeholder='Enter Name'
                            />
                            <input
                                name="message"
                                onChange={handleChange}
                                type="text"
                                value={paymentform.message}
                                className='w-full p-3 rounded-lg bg-slate-800'
                                placeholder='Enter Message'
                            />
                            <input
                                name="amount"
                                onChange={handleChange}
                                type='number'
                                value={paymentform.amount}
                                className='w-full p-3 rounded-lg bg-slate-800'
                                placeholder='Enter Amount'
                            />
                            <button
                                onClick={() => payment(Number(paymentform.amount * 100))}
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-center font-bold mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!paymentform.amount || paymentform.name?.length < 3 || paymentform.message?.length < 3}

                            >
                                Pay
                            </button>
                        </div>
                        <span className='text-gray-400'>or choose a preset amount:</span>
                        <div className='flex p-2 gap-1 md:gap-2 mt-3 '>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3}
                                onClick={() => {
                                    setPaymentform({ ...paymentform, amount: "10" });
                                    payment(1000);
                                }}
                            >
                                Pay ₹10
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3}
                                onClick={() => {
                                    setPaymentform({ ...paymentform, amount: "15" });
                                    payment(1500);
                                }}
                            >
                                Pay ₹15
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3}
                                onClick={() => {
                                    setPaymentform({ ...paymentform, amount: "20" });
                                    payment(2000);
                                }}
                            >
                                Pay ₹20
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-0 md:me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3}
                                onClick={() => {
                                    setPaymentform({ ...paymentform, amount: "50" });
                                    payment(5000);
                                }}
                            >
                                Pay ₹50
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage;
