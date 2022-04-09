import { Router } from "express";
import { indexResponse } from "../controllers/index.controllers"

const router = Router();

router.route('/')
  .get(indexResponse)

export default router;