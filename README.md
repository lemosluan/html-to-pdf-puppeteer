# html-to-pdf-puppeteer

POC generate pdf from html with puppeteer and express with docker and docker-compose

## How to use

### Start server

`docker-compose up -d`

### Or Local

`node index.js`

### Try:

http://localhost:3030?url=https://google.com.br&filename=printgoogle.pdf

### Params


`url`: Url to genrate pdf


`filename`: Filename of download file


`width`: Width in pixels to pdf (default: 1650)


`height`: Height in pixcels to pdf (default: 800 )


`format`: see options on [puppeteer_pagepdfoptions](https://github.com/puppeteer/puppeteer/blob/v10.2.0/docs/api.md#pagepdfoptions) (format has priority above width and height)
