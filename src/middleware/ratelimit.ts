import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5, // Limit each IP to 5 requests per window (1 minute).
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
