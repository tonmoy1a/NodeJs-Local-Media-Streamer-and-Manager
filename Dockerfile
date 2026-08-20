FROM node:20-alpine

# fluent-ffmpeg shells out to the ffmpeg binary for thumbnail generation
RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY . .

RUN mkdir -p cache trash

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]
