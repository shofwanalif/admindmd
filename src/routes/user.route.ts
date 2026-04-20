import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

export const userRouter = Router();

userRouter.get("/me", authenticate, (req: any, res: any) => {
  res.json({
    data: req.user,
  });
});
