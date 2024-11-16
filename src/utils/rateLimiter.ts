import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: Number(process.env.RATE_LIMIT_BY_USER),
	standardHeaders: true,
	legacyHeaders: false,
});

export default rateLimiter;
