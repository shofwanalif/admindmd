import { Router } from "express";
import { bookingController } from "./booking.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createBookingSchema } from "./booking.schema";

const bookingRouter = Router();

bookingRouter.post(
  "/create-booking",
  validate(createBookingSchema),
  bookingController.createBooking,
);
bookingRouter.get(
  "/get-all-bookings",
  authenticate,
  bookingController.getBookings,
);
bookingRouter.get(
  "/search-bookings",
  authenticate,
  bookingController.searchBookings,
);

bookingRouter.get(
  "/get-booking-today",
  authenticate,
  bookingController.getBookingToday,
);

bookingRouter.put(
  "/update-booking/:id",
  authenticate,
  bookingController.updateBooking,
);

bookingRouter.delete(
  "/delete-booking/:id",
  authenticate,
  bookingController.deleteBooking,
);
export default bookingRouter;
