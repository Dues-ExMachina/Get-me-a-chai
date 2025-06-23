

export const dynamic = 'force-dynamic'; // ✅ This tells Next.js: "don't pre-render"

import PaymentPage from "@/components/PaymentPage"
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
