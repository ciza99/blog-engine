FROM node:latest as builder

WORKDIR /app

COPY ./package.json .
RUN npm i

COPY . .

ENV VITE_API_BASE_URL=https://fullstack.exercise.applifting.cz
ENV VITE_API_KEY=64bf9e8a-f72d-4843-be86-3c499bfd0427
ENV VITE_USERNAME=ciza99
ENV VITE_PASSWORD="carrot potato tomato"

RUN npm run build

# Serving the application

FROM node:latest

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3000

RUN npm i -g serve

CMD ["npx", "serve", "dist", "-p", "3000"]
