

export const SUCCESS_MESSAGES = {
    PLANNER_AGENT_THINKING_SUCCESS:"🧠 Planner Agent thinking...",
    UI_AGENT_THINKING_SUCCESS:"🎨 UI Agent generating frontend...",
    BACKEND_AGENT_THINKING_SUCCESS:"⚙️ Backend Agent generating API...",
    DEVOPS_AGENT_THINKING_SUCCESS:"🐳 DevOps Agent generating config...",
    DEPLOY_SUCCESS: "✅ Full deployment complete"
}


export const ERROR_MESSAGES = {
    PLANNER_AGENT_THINKING_ERROR:"❌ Planner agent failed to return valid JSON",
    PROJECT_ID_REQUIRED: "projectId is required",
    MESSAGE_REQUIRED: "message is required and must be a non-empty string",
    DEPLOY_SAVE_ERROR: "Failed to save deployment to Supabase",
    INTERNAL_SERVER_ERROR: "Internal server error",
    UNAUTHORIZED: "Unauthorized: Access denied",
    INVALID_TOKEN: "Unauthorized: Invalid token",
    NO_TOKEN: "Unauthorized: No token provided",
    USER_ID_MISSING: "User ID missing",
    NAME_REQUIRED: "Name is required"
}