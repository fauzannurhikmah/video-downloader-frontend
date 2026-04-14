import { notFound } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage({
    params,
}: {
    params: Promise<{ key: string }>;
}) {
    const validKey = process.env.ADMIN_KEY;
    const { key } = await params;
    if (!validKey || key !== validKey) {
        return notFound();
    }

    return <AdminClient />;
}