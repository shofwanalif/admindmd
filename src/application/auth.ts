import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
    autoSignIn: false,
  },

  session: {
    expiresIn: 60 * 60 * 24,
    updateAge: 60 * 60 * 6,
    cookieCache: {
      enabled: true,
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://dmdcarw-fe.vercel.app",
  ],

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    sessionCookie: {
      name: "__Secure-better-auth.session_token",
      attributes: {
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        path: "/",
        domain: process.env.COOKIE_DOMAIN, // Set domain yang sama atau parent domain jika subdomains
      },
    },
  },
});
