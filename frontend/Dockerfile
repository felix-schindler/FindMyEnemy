#Basisimage: Node Alpine
FROM node:latest AS deploy-node

#Terminalbefehle -> kopiert in den Container
WORKDIR /app
RUN rm -ff ./*
COPY package.json .
#COPY --from=build /app/build .
RUN npm --prod
#CMD ["node", "index.ts"]