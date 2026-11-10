import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

async function convertImageToTransparentPNG(inputPath, outputPath, isHologram = false) {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });
  const page = await browser.newPage();

  // Read input image as base64
  const imageBuffer = fs.readFileSync(inputPath);
  const base64Data = imageBuffer.toString("base64");
  const dataUrl = `data:image/jpeg;base64,${base64Data}`;

  const pngBase64 = await page.evaluate(async ({ dataUrl, isHologram }) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        if (isHologram) {
          // Pure black keying with soft edge feathering on left boundary and bottom hem
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              const i = (y * w + x) * 4;
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const br = Math.max(r, g, b);

              let alpha = 255;
              if (br <= 32) {
                alpha = 0;
              } else if (br <= 72) {
                alpha = Math.floor(((br - 32) / 40) * 255);
              }

              // Smoothly dissolve the left ribbon boundary (x < 140) into starlight:
              if (x < 140) {
                const leftFactor = Math.pow(x / 140, 1.8);
                alpha = Math.floor(alpha * leftFactor);
              }
              // Smoothly dissolve the right boundary if any:
              if (x > w - 80) {
                const rightFactor = Math.max(0, (w - x) / 80);
                alpha = Math.floor(alpha * rightFactor);
              }
              // Smoothly dissolve bottom hem (y > h * 0.72) into starlight above the dais:
              if (y > h * 0.72) {
                const bottomFactor = Math.max(0, 1 - (y - h * 0.72) / (h * 0.28));
                alpha = Math.floor(alpha * Math.pow(bottomFactor, 1.5));
              }

              data[i + 3] = alpha;
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const resultUrl = canvas.toDataURL("image/png");
        resolve(resultUrl.split(",")[1]);
      };
      img.src = dataUrl;
    });
  }, { dataUrl, isHologram });

  await browser.close();

  const buffer = Buffer.from(pngBase64, "base64");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved transparent alpha PNG to: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function run() {
  const genieSource = "C:\\Users\\Professor Zero\\.gemini\\antigravity\\brain\\38655c78-db6a-4b60-97f6-13670cee4399\\genie_ai_concept_art_1794342290909.jpg";
  const genieOut = "f:\\ZERO UI\\public\\assets\\hologram-genie-alpha.png";
  await convertImageToTransparentPNG(genieSource, genieOut, true);
}

run().catch(console.error);
