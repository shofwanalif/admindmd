import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { userRouter } from "../routes/user.route";
import bookingRouter from "../bookings/booking.route";

import cors from "cors";

export const web = express();

web.use(express.json());
web.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://dmdcarw-fe.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

web.all("/api/auth/*splat", toNodeHandler(auth));

web.use("/api/user", userRouter);
web.use("/api/booking", bookingRouter);
