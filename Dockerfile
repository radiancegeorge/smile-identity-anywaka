FROM node:18-alpine as BuildingPhase
WORKDIR /app
COPY . .
# install packages
RUN yarn 
# build packages
RUN yarn build

FROM nginx:alpine
COPY --from=BuildingPhase /app/build /usr/share/nginx/html
# Copy the Nginx configuration file
COPY --from=BuildingPhase /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
