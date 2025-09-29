import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadCloudinaryBanner(file, fileName = Date.now().toString()) {
  // file is the FormData file object
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Convert buffer to base64
  const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Use normal upload (works reliably on Vercel)
  const result = await cloudinary.uploader.upload(base64File, {
    resource_type: "raw", // keep it raw (PDF, DOCX, etc.)
    folder: "OfferLetter",
    public_id: fileName,
    overwrite: true,
  });

  return result;
}
