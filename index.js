const express = require("express");
const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const crawler = async ({ url, filename, format, width, height, timeout }) => {
    width = parseInt(width, 10) ?? 1310;
    height = parseInt(height, 10) ?? 750;

    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      headless: true,
    });
    const finalFilename = filename + ((filename + "").includes(".pdf") ? "" : ".pdf");
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForTimeout(timeout);
    const path = `/tmp/${finalFilename}`;
    await page.pdf({
      path,
      ...(format ? { format } : {}),
      printBackground: true,
      width,
      height,
    });
    await browser.close();

    return path;
  };

  const params = {
    url: req.query.url,
    filename: req.query.filename || uuidv4(),
    width: app,
    format: req.query.format,
    width: req.query.width,
    height: req.query.height,
    timeout: req.query.timeout || 3000,
  };
  const file = await crawler(params);
  console.log({file, filename: params.filename});

  res.download(file, `${params.filename}.pdf`);
});

app.listen(process.env.PORT || 3030);
