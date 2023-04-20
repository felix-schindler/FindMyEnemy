# Backend (made with Deno)

## Developing

```bash
deno task dev  		  # starts the dev server
```

## Deployment

```bash
# Build docker image and run it
docker build .
docker run -p 8000:8000 <ID>

# Compile to single executable and run it
deno task compile
./backend

# Just start the production server
deno task start
```
