import express from "express";
import { NotFoundController } from "../controllers/404.controller";

const router = express.Router();
const { notFound } = new NotFoundController();

router.get("*", (req, res) => notFound(req, res));

export { router as notFoundRoutes };
