import winston from "winston";

const { combine, timestamp, errors, json, metadata } = winston.format;

const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp(),
    errors({ stack: true }),
    metadata({ fillExcept: ["message", "level", "timestamp"] }),
    json(),
  ),

  transports: [new winston.transports.Console()],
});

export { logger };
