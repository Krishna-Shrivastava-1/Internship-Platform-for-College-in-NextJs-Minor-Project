export const runtime = "node";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadCloudinary(buffer, fileName = Date.now().toString()) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // make sure Cloudinary doesn't force image
        folder: "OfferLetter",
        public_id: fileName,  // give it a clean name
        type: "upload",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // ✅ safer way to send buffer
    uploadStream.write(buffer);
    uploadStream.end();
  });
}