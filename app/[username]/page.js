import PaymentPage from "@/components/PaymentPage"
import { notFound } from "next/navigation";
import connectDb from "@/utils/db/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
    const resolvedParams = await params; // Await params here
    await connectDb();
    const u = await User.findOne({ username: resolvedParams.username });
    if (!u) {
        notFound();
    }
    return (
        <>
            <PaymentPage username={resolvedParams.username} />
        </>
    );
}

export default Username;



// Dynamic metadata
export async function generateStaticParams() {
    await connectDb();
    const users = await User.find({}, { username: 1 }).lean();
    return users.map(user => ({
        username: user.username
    }));
}