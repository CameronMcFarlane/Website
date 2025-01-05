# Website \\\ [mcfarlane.cam](https://mcfarlane.cam)

This is my website. A little corner of the internet which I plan to use as a sandbox; a place to experiement with web development.

Every time I've tried to tackle this project in the past, I've always got caught up in learning a hot new framework and tried to make some complex single-page application. This time, we're going back to the roots. No front-end framework. Let's just build a website using vanilla HTML, CSS and JavaScript. I only want to add additional complexity if absolutely necessary to hit the goal within a justifiable amount of effort.

*We'll see... I might give in to TypeScript eventually.*

## Development

> **Pre-requisites:**  
> Docker is installed on the development machine.

To match the development and production environments together, I've created a `docker-compose.yml` file which defines a `webserver` container running an Nginx server. The `src` directory is bound to the container, ensuring that changes to the source code are instantly reflected.

I haven't yet figured out how to achieve live reloading with my vanilla set-up, so a browser page refresh is required after changes are made.

To start the development Nginx server, run the following command in the repository's root:

```bash
docker compose up -d
```

## Deployment

> **Pre-requisites:**  
> Docker is installed on the host machine.

To deploy this website for a production environment, start by cloning this repository on the production server.

Once cloned, duplicate the `.env.example` file and rename it to `.env`. Open `.env` in a text editor and provide values for each of the properties, as per their descriptions.

When starting this Docker composition for the first time, there is a slight chicken and egg situation. Nginx can't start if the Let's Encrypt certificates haven't yet been generated, therefore we can't use the Nginx proxy to pass through requests for the Certbot ACME challenge to generate the certificates. To get around this, we just need to open up port `80` on the `letsencrypt` Docker container for the first run.

So, open `docker-compose.prod.yml` in a text editor and uncomment the `ports` section. Next, start the `letsencrypt` container with the following command:

```bash
docker compose -f docker-compose.prod.yml up letsencrypt
```

With the certificates successfully generated and stored in the `certdata` Docker volume, we can undo the changes we made to `docker-compose.prod.yml`. A quick way to do this is to run the following command:

```bash
git restore .
```

The last piece is to configure automatic certificate renewal as a daily cronjob. The following two commands need to be executed:

```bash
docker compose -f docker-compose.prod.yml up letsencrypt
docker compose exec webserver nginx -s reload
```

The first command will check the expiration on the certificate and kick off a renewal process when its due. The running Nginx server will act as a proxy for the Certbot certificate validation. The second command sends a SIGHUP signal to Nginx, which forces it to reload its configuration, including certificates, without interrupting service.

With the host now fully configured, we can start the webserver! To do this, run the following command:

```bash
docker compose -f docker-compose.prod.yml up webserver -d
```
