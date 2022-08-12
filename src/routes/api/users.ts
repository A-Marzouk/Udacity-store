import express from "express";
import { requireAuthentication } from "../../middleware/Auth/authMiddleware";
import {
  createUser,
  deleteUser,
  getUsersList,
  retrieveUserById,
  updateUser,
} from "../../controllers/users.controller";

const router = express.Router();

router.get("/users", getUsersList);
router.get("/users/:id", retrieveUserById);
router.post("/users", requireAuthentication, createUser);
router.put("/users/:id", requireAuthentication, updateUser);
router.delete("/users/:id", requireAuthentication, deleteUser);

export default router;
