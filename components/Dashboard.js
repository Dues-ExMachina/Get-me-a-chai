"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateProfile, fetchuser } from '@/actions/useractions';




const Dashboard = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();


    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        profilepic: "",
        coverpic: "",
        Razorpayid: "",
        Razorpaysecret: ""
    });

    // useEffect(() => {
    //     getdata();
    //     if (status === 'unauthenticated') {
    //         router.push('/login');
    //     }
    // }, [getdata, status, router]);



    // const getdata = async () => {
    //     if (!session?.user?.name) return;
    //     let u = await fetchuser(session.user.name);
    //     if (u) {
    //         setForm({
    //             name: u.name || "",
    //             email: u.email || "",
    //             username: u.username || "",
    //             profilepic: u.profilepic || "",
    //             coverpic: u.coverpic || "",
    //             Razorpayid: u.Razorpayid || "",
    //             Razorpaysecret: u.Razorpaysecret || ""
    //         });
    //     }
    // }

    //     const getdata = useCallback(async () => {
    //     if (!session?.user?.name) return;
    //     let u = await fetchuser(session.user.name);
    //     if (u) {
    //         setForm({
    //             name: u.name || "",
    //             email: u.email || "",
    //             username: u.username || "",
    //             profilepic: u.profilepic || "",
    //             coverpic: u.coverpic || "",
    //             Razorpayid: u.Razorpayid || "",
    //             Razorpaysecret: u.Razorpaysecret || ""
    //         });
    //     }
    // }, [session]); // Include any dependencies it uses

    // useEffect(() => {
    //     getdata();
    //     if (status === 'unauthenticated') {
    //         router.push('/login');
    //     }
    // }, [getdata, status, router]);

    const getdata = useCallback(async () => {
        if (!session?.user?.name) return;
        let u = await fetchuser(session.user.name);
        if (u) {
            setForm({
                name: u.name || "",
                email: u.email || "",
                username: u.username || "",
                profilepic: u.profilepic || "",
                coverpic: u.coverpic || "",
                Razorpayid: u.Razorpayid || "",
                Razorpaysecret: u.Razorpaysecret || ""
            });
        }
    }, [session]);
    useEffect(() => {
        getdata();
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [getdata, status, router]);


    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return null; // Prevent rendering until redirected
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // <-- Prevents page reload!

        update();
        let a = await updateProfile(form, session.user.name);
        toast.success('Profile Updated Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

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
                theme="dark"
                transition={Bounce}
            />
            <div>
                <div className='text-2xl font-bold text-center p-5'>Wellcome to Dashboard</div>
                <form onSubmit={handleSubmit} className='container mx-auto mb-6 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[80vw] md:w-[60vw] lg:w-[40vw]'>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input type="text" id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Abcd Efg" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">User Name</label>
                        <input type="text" id="username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed " disabled placeholder="@xyz" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Pic</label>
                        <input type="text" id="profilepic" value={form.profilepic} onChange={e => setForm({ ...form, profilepic: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Image</label>
                        <input type="text" id="coverpic" value={form.coverpic} onChange={e => setForm({ ...form, coverpic: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    </div>
                    {/* Razor pay id */}
                    <div className="mb-6">
                        <label htmlFor="Razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay_Id</label>
                        <input type="text" id="Razorpayid" value={form.Razorpayid} onChange={e => setForm({ ...form, Razorpayid: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
                    </div>
                    {/* Razor pay Secret */}
                    <div className="mb-6">
                        <label htmlFor="Razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay_Secret</label>
                        <input type="text" id="Razorpaysecret" value={form.Razorpaysecret} onChange={e => setForm({ ...form, Razorpaysecret: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Make sure to check to <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Details</a>.</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>

            </div>
        </>
    )
}

export default Dashboard
