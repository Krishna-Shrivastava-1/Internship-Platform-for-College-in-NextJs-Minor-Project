'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

const page = () => {
     const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    } else {
      setPreview(null);
    }
  };
  const handleUpload = async () => {
    if(!image) return toast.error('No Image is Selected.')
    const formData = new FormData()
    formData.append("banner",image)
try {
      const resp = await axios.post("/api/landingpage/bannercontentcollect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (resp.data.success) {
        toast.success("Banner uploaded successfully!");
        console.log(resp.data)
        setImage(null);
        setPreview(null);
      } else {
        alert(resp.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading banner");
    }
  }
  return (
    <div>
       <div className="w-full max-w-sm gap-3 flex items-center">
        <label className="text-lg" htmlFor="picture">
          Select Banner Image
        </label>
        <input
          required
          id="picture"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
        />
      </div>

      <h2>Preview of Banner</h2>
      {preview && (
        <img
          src={preview}
          alt="Banner Preview"
          width={200}
          height={100}
          className="border rounded"
        />
      )}
       <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Upload Banner
      </button>
    </div>
   
  )
}

export default page
