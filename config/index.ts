const config = {
    ADMIN_KEY: process.env.ADMIN_KEY || "",
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export default config;