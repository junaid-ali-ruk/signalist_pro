# Signalist Stock Tracker

A modern stock tracking application that helps users monitor and manage their watchlists.

## Features

- Real-time stock tracking
- Personalized watchlist management
- Market news and updates
- Email notifications
- Secure authentication

## Security Features

This application implements several security measures:

1. **Content Security Policy (CSP)** - Prevents XSS attacks by controlling which resources can be loaded
2. **Rate Limiting** - Prevents abuse of API endpoints
3. **Input Validation** - All user inputs are validated to prevent injection attacks
4. **API Key Protection** - External API keys are never exposed to the client
5. **Secure Authentication** - Uses better-auth for secure session management
6. **Security Headers** - Implements various HTTP security headers

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration values
5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

See `.env.example` for required environment variables.

## Security Best Practices

1. Never commit sensitive information to version control
2. Regularly update dependencies
3. Use strong, unique passwords for all services
4. Rotate API keys periodically
5. Monitor logs for suspicious activity

## Deployment

For production deployment, ensure you:

1. Set `NODE_ENV=production`
2. Use a strong `BETTER_AUTH_SECRET`
3. Configure proper HTTPS
4. Set up monitoring and alerting
5. Regularly backup your database