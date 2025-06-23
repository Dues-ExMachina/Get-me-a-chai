// --- START OF FILE page.js (in app/[username]/) ---
// Make absolutely sure this is the entire content of the file.

export const dynamic = 'force-dynamic';

import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/utils/db/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
    await connectDb();
    const u = await User.findOne({ username: params.username });

    if (!u) {
        notFound();
    }

    return <PaymentPage username={params.username} />;
}

export default Username;