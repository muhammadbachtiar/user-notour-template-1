# === Stage 1: Build the React app ===
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# === Generate SEO file and build the app ===
RUN npm run generate-seo
RUN npm run build

# === Stage 2: Serve with Nginx ===
FROM nginx:alpine AS runner

# Hapus default config
RUN rm -rf /usr/share/nginx/html/*

# Copy build output ke nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# (opsional) Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
