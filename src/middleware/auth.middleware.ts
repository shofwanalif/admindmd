import { auth } from "../application/auth";
import { logger } from "../application/logging";

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      logger.warn("Unauthorized access attempt", {
        path: req.originalUrl,
        method: req.method,
        // ip: req.ip,
      });

      return res.status(401).json({
        error: "Unauthorized",
        message: "Login to access this resource",
      });
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    logger.error("Authentication Error", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      path: req.originalUrl,
      method: req.method,
      //   ip: req.ip,
    });

    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred during authentication",
    });
  }
};
