import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

export const configSecurity = (app) => {
    // Set security HTTP headers
    app.use(helmet());

    // Rate limiting middleware to prevent brute-force attacks
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.'
    });

    app.use(limiter);

    // Sanitize request data to prevent MongoDB Operator Injection
    app.use(mongoSanitize());

    // Additional security configurations can be added here
};
