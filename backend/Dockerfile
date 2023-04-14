# Using deno alpine image
FROM denoland/deno:alpine

# Set the working directory (could be any directory)
WORKDIR /app

# Prefer not to run as root.
USER deno

# Compile into a single executable
RUN deno task compile

# Run the app
CMD ["./backend"]

# The port that your application listens to.
EXPOSE 8000:8000
