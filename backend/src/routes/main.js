import express from "express";
import userroutes from "./user.routes.js"
const router = express.Router();
router.use ("/api/v1",userroutes)
export default router