FROM node:14
RUN mkdir /app
COPY . /app
WORKDIR /app/dist/
RUN yarn --ignore-scripts
CMD ["node","index.js"]


