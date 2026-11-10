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

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = Math.max(r, g, b);

          if (isHologram) {
            // For hologram on black: brightness directly maps to alpha smoothly
            // so glowing hair and starlight blend transparently into any background!
            if (brightness < 12) {
              data[i + 3] = 0; // Pure transparent background
            } else if (brightness < 45) {
              // Smooth feathering
              data[i + 3] = Math.floor(((brightness - 12) / 33) * 255);
            } else {
              data[i + 3] = 255;
            }
          } else {
            // For mascot: solid opaque character on black background
            // Background is pure black (r < 15, g < 15, b < 15)
            if (r < 18 && g < 18 && b < 18) {
              data[i + 3] = 0;
            } else if (r < 32 && g < 32 && b < 32) {
              // Edge antialiasing feather
              const avg = (r + g + b) / 3;
              data[i + 3] = Math.floor(((avg - 18) / 14) * 255);
            } else {
              data[i + 3] = 255;
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png").split(",")[1]);
      };
      img.src = dataUrl;
    });
  }, { dataUrl, isHologram });

  await browser.close();

  const buffer = Buffer.from(pngBase64, "base64");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved transparent PNG: ${outputPath} (${buffer.length} bytes)`);
}

async function run() {
  const brainDir = "C:\\Users\\Professor Zero\\.gemini\\antigravity\\brain\\38655c78-db6a-4b60-97f6-13670cee4399";
  const assetsDir = "F:\\ZERO UI\\public\\assets";

  const genieIn = path.join(brainDir, "genie_ai_companion_1794338780909.jpg");
  const genieOut = path.join(assetsDir, "hologram-genie-alpha.png");

  const mascotIn = path.join(brainDir, "zero_robot_mascot_1794338796162.jpg");
  const mascotOut = path.join(assetsDir, "robot-mascot-alpha.png");

  await convertImageToTransparentPNG(genieIn, genieOut, true);
  await convertImageToTransparentPNG(mascotIn, mascotOut, false);
}

run().catch(console.error);
