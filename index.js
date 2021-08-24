const express = require("express");
const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const crawler = async (
    url,
    filename = null,
    format = null,
    width = null,
    height = null
  ) => {
    width = parseInt(width, 10) ?? 1650;
    height = parseInt(height, 10) ?? 800;

    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    filename += (filename + "").includes(".pdf") ? "" : ".pdf";
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const path = `/tmp/${filename}`;
    await page.pdf({
      path,
      ...(format ? { format } : {}),
      width,
      height,
    });
    await browser.close();

    return path;
  };

  const url = req.query.url;
  let filename = req.query.filename ?? uuidv4();
  const format = req.query.format;
  const width = req.query.width;
  const height = req.query.height;
  const file = await crawler(url, filename, format, width, height);

  res.download(file, `${filename}.pdf`);
});

app.listen(process.env.PORT || 3030);
