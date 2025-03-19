FROM node:20

# Set the working directory for the frontend
WORKDIR /app/frontend

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency definitions from the current context (./frontend)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies (this creates node_modules in the image)
RUN pnpm install

# Copy the rest of the application source code from the current context
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
