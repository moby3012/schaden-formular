This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Docker Deployment

This application can be easily deployed using Docker and Docker Compose. Follow these steps to deploy the application.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd schaden-formular
   ```

2. **Configure environment variables**:
   
   Copy the example environment file and edit it with your email settings:
   ```bash
   cp example.env .env
   ```
   
   Edit `.env` and set your email configuration:
   - `EMAIL`: Your sender email address
   - `EMAIL_PASS`: Your email password or app-specific password
   - `EMAIL_HOST`: Your SMTP server (e.g., smtp.gmail.com)
   - `EMAIL_PORT`: SMTP port (usually 465 for SSL or 587 for TLS)
   - `EMAIL_DEST`: The recipient email address for form submissions

3. **Build and start the application**:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**:
   
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Configuration

#### Port Configuration

By default, the application runs on port 3000. To change the host port, edit `docker-compose.yml`:

```yaml
ports:
  - "80:3000"  # Use port 80 on host
  # or
  - "8080:3000"  # Use port 8080 on host
```

#### Email Setup

The application requires valid SMTP credentials to send emails. Here are some common configurations:

**Gmail**:
- `EMAIL_HOST`: smtp.gmail.com
- `EMAIL_PORT`: 465
- Note: You may need to enable "Less secure app access" or create an [App Password](https://support.google.com/accounts/answer/185833)

**Outlook/Office365**:
- `EMAIL_HOST`: smtp-mail.outlook.com (or smtp.office365.com)
- `EMAIL_PORT`: 587

**Custom SMTP**:
- Contact your email provider for SMTP settings

### Docker Commands

**Start the application**:
```bash
docker-compose up -d
```

**Stop the application**:
```bash
docker-compose down
```

**View logs**:
```bash
docker-compose logs -f
```

**Rebuild the image** (after code changes):
```bash
docker-compose up -d --build
```

**Check application health**:
```bash
docker-compose ps
```

### Deployment to Production

For production deployment:

1. Ensure `.env` file contains production email credentials
2. Update the port mapping in `docker-compose.yml` if needed
3. Consider using a reverse proxy (nginx, traefik) for HTTPS
4. Set up proper firewall rules
5. Configure automatic restarts (already included in docker-compose.yml)

### Troubleshooting

**Container fails to start**:
- Check logs: `docker-compose logs`
- Verify environment variables are set correctly in `.env`
- Ensure port 3000 (or your configured port) is not already in use

**Email not sending**:
- Verify SMTP credentials in `.env` file
- Check your email provider's security settings
- Review container logs for error messages: `docker-compose logs schaden-formular`

**Cannot access the application**:
- Ensure the container is running: `docker-compose ps`
- Check firewall settings
- Verify the correct port is exposed in docker-compose.yml

### Sharing the Application

To share this application with someone for deployment:

1. Share the repository URL
2. Provide them with the email credentials they should use (via secure channel)
3. Direct them to this README section
4. They just need to:
   - Clone the repository
   - Create a `.env` file with the provided credentials
   - Run `docker-compose up -d`

