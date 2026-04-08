

import { Express } from "express"

import express from "express"

import helmet from "helmet"

import morgan from "morgan"

import cors from "cors"
import { ENV } from "@shared/constants/env"
import { errorHandler } from "@shared/middleware/error.middleware"
import sandboxRoutes from "@features/sandbox/sandboxRoutes"



export const CreateServer = () : Express =>{


    const app = express()

    app.use(helmet())

    app.use(cors({
        origin:ENV.CLIENT_URL,
        credentials:true
    }))

    app.use(express.json())

    app.use(express.urlencoded({ extended: true }));

    app.use("/api/sandbox",sandboxRoutes)
    app.use(morgan("dev"))

    app.use(errorHandler)

    return app


}