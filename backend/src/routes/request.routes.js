import express from "express";
import { createRequest, getTalentRequests,getClientRequests, updateRequestStatus } from "../controllers/request.controller";

const router = express.Router();


router.post("/", createRequest);
router.get("/talent/:talentId", getTalentRequests);
router.get("/client/:clientId", getClientRequests);
router.patch("/:id/status", updateRequestStatus);

export default router;