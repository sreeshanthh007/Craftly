

import { Express } from "express"

import express from "express"

import helmet from "helmet"

import morgan from "morgan"

import cors from "cors"
import { ENV } from "@shared/constants/env"
import { errorHandler } from "@shared/middleware/error.middleware"
import sandboxRoutes from "@features/sandbox/sandboxRoutes"
import deployRoutes from "@features/deploy/deployRoutes"
import chatRoutes from "@features/chat/chatRoutes"
import projectsRoutes from "@features/projects/projectsRoutes"
import { requireAuth } from "@shared/middleware/auth"


export const CreateServer = () : Express =>{
    const app = express()

    app.use(morgan("dev"))
    app.use(helmet())

    app.use(cors({
        origin:ENV.CLIENT_URL,
        credentials:true
    }))

    app.use(express.json())

    app.use(express.urlencoded({ extended: true }));

    // Protected Routes
    app.use("/api/sandbox", requireAuth, sandboxRoutes)
    app.use("/api/deploy", requireAuth, deployRoutes)
    app.use("/api/projects", requireAuth, projectsRoutes)
    app.use("/api/chat", requireAuth, chatRoutes)

    app.use(errorHandler)

    return app


}