import { bookingService } from "./booking.service";
import { updateBookingSchema } from "./booking.schema";
import { Request, Response } from "express";
import { logger } from "../application/logging";

export const bookingController = {
  async createBooking(req: Request, res: Response) {
    try {
      const { nama, whatsapp, service, tanggal, nopol, jam, status } = req.body;
      const booking = await bookingService.createBooking({
        nama,
        whatsapp,
        service,
        tanggal,
        nopol,
        jam,
        status: status || "PENDING",
      });
      res.status(200).json({ message: "Booking berhasil dibuat" });
      logger.info("Booking berhasil dibuat", { data: booking });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getBookings(req: Request, res: Response) {
    try {
      const bookings = await bookingService.getBookings();
      if (!bookings) {
        return res.status(404).json({ error: "Belum ada data booking" });
      }
      res.json({ data: bookings });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async searchBookings(req: Request, res: Response) {
    try {
      const nopol = req.query.nopol as string;

      if (!nopol) {
        logger.warn("Masukan nopol untuk mencari booking");
        return res
          .status(400)
          .json({ error: "Masukan nopol untuk mencari booking" });
      }

      const bookings = await bookingService.getBookingByVehicle(nopol);
      if (bookings.length === 0) {
        return res.status(404).json({ error: "Booking tidak ditemukan" });
      }

      return res.status(200).json({
        data: bookings,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nama, whatsapp, service, tanggal, nopol, jam, status } = req.body;
      const booking = await bookingService.updateBooking(Number(id), {
        nama,
        whatsapp,
        service,
        tanggal,
        nopol,
        jam,
        status,
      });
      logger.info("Booking berhasil diperbarui", { data: booking });
      res.json({ message: "Booking berhasil diperbarui", data: booking });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await bookingService.deleteBooking(Number(id));
      res
        .status(200)
        .json({ message: "Booking berhasil dihapus", data: booking });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getBookingToday(req: Request, res: Response) {
    try {
      const bookings = await bookingService.getBookingToday();
      if (!bookings) {
        return res
          .status(404)
          .json({ error: "Tidak ada booking untuk hari ini" });
      }
      res.json({ data: bookings });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
