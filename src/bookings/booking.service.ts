import { CreateBookingDTO } from "./booking.schema";
import { prisma } from "../application/prisma";
import { Booking } from "../../prisma/generated/prisma/client";

export const bookingService = {
  async createBooking(data: CreateBookingDTO) {
    const { nama, whatsapp, service, tanggal, nopol, jam } = data;

    return await prisma.booking.create({
      data: {
        nama,
        whatsapp,
        service,
        tanggal,
        nopol,
        jam,
      },
    });
  },

  async getBookings() {
    const data = await prisma.booking.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return data;
  },

  async getBookingByVehicle(search: string) {
    if (!search || search.trim() === "") {
      throw new Error("Nopol tidak boleh kosong");
    }

    const normalized = search.replace(/\s+/g, "").toLowerCase();

    const result = await prisma.$queryRaw<Booking[]>`
       SELECT id, nama, nopol, service, tanggal, jam, status
       FROM Booking
       WHERE REPLACE(nopol, ' ', '') LIKE ${"%" + normalized + "%"}
       ORDER BY tanggal ASC
     `;

    return result;
  },

  async updateBooking(id: number, data: Partial<CreateBookingDTO>) {
    const booking = await prisma.booking.update({
      where: {
        id,
      },
      data,
    });
    return booking;
  },

  async deleteBooking(id: number) {
    const booking = await prisma.booking.delete({
      where: { id },
    });
    return booking;
  },
};
