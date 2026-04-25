import { z } from "zod";

export const createBookingSchema = z.object({
  nama: z
    .string({ error: "Nama wajib diisi" })
    .trim()
    .min(3, "Nama minimal 3 karakter"),
  whatsapp: z
    .string({ error: "Nomor WhatsApp wajib diisi" })
    .trim()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{7,11}$/,
      "Format nomor WhatsApp tidak valid (contoh: 08123456789)",
    ),

  nopol: z
    .string({ error: "Nomor polisi wajib diisi" })
    .trim()
    .min(4, "Nomor polisi minimal 4 karakter")
    .transform((val) => val.toUpperCase()),

  service: z
    .string({ error: "Layanan wajib dipilih" })
    .trim()
    .min(1, "Layanan wajib dipilih"),

  tanggal: z.coerce
    .date({
      error: "Tanggal wajib diisi",
    })
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Tanggal tidak boleh di masa lalu",
    }),

  jam: z
    .string({ error: "Jam wajib diisi" })
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Format jam tidak valid (contoh: 09:00)",
    ),

  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED"], {
      error: "Status tidak valid",
    })
    .optional()
    .default("PENDING"),
});

export const updateBookingSchema = createBookingSchema.partial();

export type CreateBookingDTO = z.infer<typeof createBookingSchema>;
// export type UpdateBookingDTO = z.infer<typeof updateBookingSchema>;
