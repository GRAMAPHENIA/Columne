import React, { useState, useRef } from "react";
import { Task } from "@/types/task";
import { TagInput } from "./TagInput";
import Image from "next/image";
import UploadPhoto from "../icons/UploadPhoto";

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id">) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title,
        description,
        date: new Date().toISOString(),
        tags,
        columnId: "Pendiente",
        photoUrl,
      });
      setTitle("");
      setDescription("");
      setTags([]);
      setPhotoUrl(undefined);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-lg shadow-lg w-full"
    >
      <h2 className="text-xl font-bold mb-6 text-blue-400">
        Añadir Nueva Tarea
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="w-full p-2 mb-4 border border-slate-700 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción de la tarea"
        className="w-full p-2 mb-4 border border-slate-700 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={3}
      />
      <TagInput tags={tags} setTags={setTags} />
      <div className="mt-2">
        <label
          htmlFor="photo-upload"
          className="block flex flex-col items-center justify-center w-full text-center cursor-pointer text-blue-400 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
        ><UploadPhoto/>
          <span className="text-sm">Haz clic para subir una foto</span>
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      {photoUrl && (
        <Image
          width={300}
          height={300}
          src={photoUrl}
          alt="Vista previa"
          className="mt-4 w-full h-32 object-cover rounded-lg"
        />
      )}
      <button
        type="submit"
        className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Añadir Tarea
      </button>
    </form>
  );
};

export default AddTaskForm;
