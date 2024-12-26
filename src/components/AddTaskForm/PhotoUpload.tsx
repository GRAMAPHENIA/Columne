import React from "react";
import UploadPhoto from "@/components/icons/UploadPhoto";

interface PhotoUploadProps {
  photo: File | null;
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  setPhotoPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  setPhoto,
  setPhotoPreview,
}) => {
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="photo-upload"
        className="block w-full text-center cursor-pointer text-teal-500 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
        aria-label="Subir foto"
      >
        <div className="flex flex-col justify-center items-center">
          <UploadPhoto />
        </div>
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
        aria-labelledby="photo-upload"
      />
    </div>
  );
};
