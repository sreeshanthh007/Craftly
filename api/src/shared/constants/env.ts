
import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV!,
    CLIENT_URL: process.env.CLIENT_URL!,
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_KEY: process.env.SUPABASE_KEY!,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN!,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME!,
    VERCEL_TOKEN: process.env.VERCEL_TOKEN!,
    VERCEL_TEAM_ID: process.env.VERCEL_TEAM_ID ?? '',
    RENDER_API_KEY: process.env.RENDER_API_KEY!
}
