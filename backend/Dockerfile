# Using deno alpine image
FROM denoland/deno:alpine

# Set the working directory (could be any directory)
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Compile into a single executable
RUN deno task compile

# Run the app
CMD ["./backend"]

# The port that your application listens to.
EXPOSE 8000
