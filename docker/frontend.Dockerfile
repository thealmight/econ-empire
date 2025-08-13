# Frontend Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend ./frontend
ARG REACT_APP_API_BASE=""
ARG REACT_APP_SOCKET_URL=""
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
ENV REACT_APP_SOCKET_URL=$REACT_APP_SOCKET_URL
RUN cd frontend && npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
# Basic nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]