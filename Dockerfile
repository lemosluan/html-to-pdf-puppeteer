FROM buildkite/puppeteer:latest

WORKDIR /code

ADD . /code/

RUN yarn

CMD ["node", "index.js"]

EXPOSE 3000