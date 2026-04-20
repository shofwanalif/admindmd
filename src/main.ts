import dotenv from "dotenv";
dotenv.config();

import { web } from "./application/web";
import { logger } from "./application/logging";

const PORT = process.env.APP_PORT || 4000;

web.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
