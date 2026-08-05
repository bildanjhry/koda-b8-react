FROM alpine:latest AS project
WORKDIR /source
RUN apk add git
RUN git clone https://github.com/bildanjhry/koda-b8-react.git .

FROM node:alpine AS builder
WORKDIR /build
COPY --from=project /source/ .
RUN npm install
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /build/dist/ /usr/share/nginx/html
COPY --from=builder /build/default.conf /etc/nginx/conf.d/default.conf