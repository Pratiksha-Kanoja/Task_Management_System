import { Router } from "express";

// Importing route handlers
import taskrouter from "./Task.routes.js";
import Authrouter from "./Auth.routes.js";

// Creating a new Router instance
const router = Router();

// Documentation: Mounting task routes under the "/task" endpoint
router.use("/task",taskrouter);

// Documentation: Mounting authentication routes under the "/auth" endpoint
router.use("/auth",Authrouter);

export default router;