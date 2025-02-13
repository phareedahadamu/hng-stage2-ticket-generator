"use client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useState } from "react";
interface ImageInfo {
  status: string;
  url: string;
  width: number;
  height: number;
}
export default function ImageUpload() {
  const [status, setStatus] = useState<ImageInfo>({
    status: "",
    url: "",
    width: 0,
    height: 0,
  });
  return (
    <CldUploadWidget
      uploadPreset="my-preset"
      onSuccess={(results) => {
        const i = Object(results.info as CloudinaryUploadWidgetInfo);
        console.log(i);
        setStatus({
          status: "Success",
          url: i.url,
          width: i.width,
          height: i.height,
        });
      }}
    >
      {({ open }) => {
        return (
          <>
            <button onClick={() => open()}>Upload an Image</button>
            {status.status !== "" && (
              <p>
                {status.status} {status.url} {status.width} {status.height}
              </p>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
}
