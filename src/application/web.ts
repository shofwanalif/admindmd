import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { userRouter } from "../routes/user.route";
import bookingRouter from "../bookings/booking.route";

import cors from "cors";

export const web = express();

web.all("/api/auth/*splat", toNodeHandler(auth));

web.use(express.json());
web.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

web.use("/api/user", userRouter);
web.use("/api/booking", bookingRouter);
