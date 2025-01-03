# Website

This is my website. My little corner of the internet which I plan to use as a sandbox - a place to experiement with web development. 

> [mcfarlane.cam](https://mcfarlane.cam)

Every time I've tried to tackle this project in the past, I've always got caught up in learning a hot new framework and tried to make some complex single-page application. This time, we're going back to the roots. No front-end framework. No API. Let's just build a static website with HTML, CSS and JavaScript. I only want to add additional complexity if absolutely necessary to hit the goal with a justifiable amount of effort.

## Development

To try and match the development and production environments, I've created a `docker-compose.yml` file which defines a `webserver` container running an NGINX server. The `src` directory is bind mounted to the container, ensuring that changes to the source code are instantly reflected within the container. However, live reloading has not yet been configured, so a browser page refresh is required after changes are made.

To start the development NGINX server, run the following command in the repository's root:

```bash
docker compose up -d
```

## Deployment

To deploy this website for a production environment, start by cloning this repository on the production server.

Once cloned, duplicate the `.env.example` file and rename it to `.env`. Open `.env` in a text editor and update the values of the `DOMAINNAME` and `EMAIL` properties.
