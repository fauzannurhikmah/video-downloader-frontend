// app/api/upload-cookies/route.ts
import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const response = await fetch(`${config.BACKEND_URL}/api/upload-cookies`, {
        method: "POST",
        headers: {
            "x-api-key": config.ADMIN_KEY,
        },
        body: formData,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}