# Using deno alpine image
FROM denoland/deno:alpine

# Set the working directory (could be any directory)
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Compile into a single executable
# RUN deno cache ./src/main.ts
# RUN deno task compile

# Run the app
# CMD ["./backend"]
CMD ["deno", "task", "start"]
