import express from "express";
import { requireAuthentication } from "../../middleware/Auth/authMiddleware";
import {
  createUser,
  getUsersList,
  retrieveUserById,
} from "../../controllers/users.controller";

const router = express.Router();

router.get("/", requireAuthentication, getUsersList);
router.get("/:id", requireAuthentication, retrieveUserById);
router.post("/", requireAuthentication, createUser);

export default router;
