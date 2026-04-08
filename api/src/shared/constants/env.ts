
import dotenv from "dotenv"

dotenv.config()

export const ENV = {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV!,
    CLIENT_URL: process.env.CLIENT_URL!,
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_KEY: process.env.SUPABASE_KEY!,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY!
}
