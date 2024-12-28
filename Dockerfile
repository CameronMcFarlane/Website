# Use an nginx image as the base
FROM nginx:latest

# Copy across the nginx config file
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copy across the website contents
COPY ./src/ /usr/share/nginx/html

# Informs Docker that the container listens on port 80 and 443
EXPOSE 80
EXPOSE 443

# Print out the contents copied into the container
RUN ls -Rla /usr/share/nginx/html

