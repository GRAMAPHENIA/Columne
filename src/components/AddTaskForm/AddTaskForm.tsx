import React, { useState, useRef } from "react";
import { Task } from "@/types/task";
import { TagInput } from "./TagInput";
import Image from "next/image";
import UploadPhoto from "../icons/UploadPhoto";

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id">) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  // Estados para manejar los valores de la tarea
  const [title, setTitle] = useState(""); // Título de la tarea
  const [description, setDescription] = useState(""); // Descripción de la tarea
  const [tags, setTags] = useState<string[]>([]); // Etiquetas asociadas a la tarea
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(); // URL de la foto subida
  const [photoError, setPhotoError] = useState<string | undefined>(); // Mensaje de error en caso de formato incorrecto o tamaño excesivo

  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia al input de archivo

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar que el título no esté vacío antes de añadir la tarea
    if (title.trim()) {
      // Llamar a la función onAddTask pasada como prop
      onAddTask({
        title,
        description,
        date: new Date().toISOString(),
        tags,
        columnId: "Pendiente", // Valor predeterminado de columna
        photoUrl,
      });

      // Resetear los campos del formulario
      setTitle("");
      setDescription("");
      setTags([]);
      setPhotoUrl(undefined);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Función para manejar la carga de la foto
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo (aceptar solo imágenes .jpg, .png, .gif, .webp)
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setPhotoError("Solo se permiten imágenes .jpg, .png, .gif, .webp");
        setPhotoUrl(undefined); // Resetear la URL de la foto si el archivo no es válido
        return;
      }

      // Validar tamaño del archivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setPhotoError("El archivo es demasiado grande. Máximo 5MB.");
        setPhotoUrl(undefined); // Resetear la URL de la foto si el archivo es demasiado grande
        return;
      }

      setPhotoError(undefined); // Limpiar el error si todo está bien

      // Leer el archivo y obtener la URL de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string); // Guardar la URL de la imagen en el estado
      };
      reader.readAsDataURL(file); // Leer el archivo como Data URL
    }
  };

  return (
    <form
      onSubmit={handleSubmit} // Ejecutar handleSubmit al enviar el formulario
      className="bg-slate-800 p-6 rounded-lg w-full"
    >
      <h2 className="text-xl font-bold mb-6 text-blue-400">
        Añadir Nueva Tarea
      </h2>

      {/* Campo para el título de la tarea */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Actualizar el título al escribir
        placeholder="Título de la tarea"
        className="w-full p-2 mb-4 border border-slate-700 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />

      {/* Campo para la descripción de la tarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Actualizar la descripción al escribir
        placeholder="Descripción de la tarea"
        className="w-full p-2 mb-4 border border-slate-700 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        rows={3}
      />

      {/* Componente para las etiquetas */}
      <TagInput tags={tags} setTags={setTags} />

      {/* Sección para subir una foto */}
      <div className="mt-2">
        <label
          htmlFor="photo-upload"
          className="flex flex-col items-center justify-center w-full text-center cursor-pointer text-blue-400 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
        >
          <UploadPhoto /> {/* Icono para la carga de foto */}
          <span className="text-sm">Haz clic para subir una foto</span>
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*" // Permitir solo imágenes
          onChange={handlePhotoUpload} // Llamar a handlePhotoUpload al seleccionar un archivo
          className="hidden"
          ref={fileInputRef} // Asociar el input con la referencia
        />
      </div>

      {/* Mostrar la vista previa de la foto si se ha seleccionado */}
      {photoUrl && (
        <Image
          width={300}
          height={300}
          src={photoUrl}
          alt="Vista previa"
          className="mt-4 w-full h-32 object-cover rounded-lg"
        />
      )}

      {/* Mostrar el mensaje de error si la validación de la foto falla */}
      {photoError && (
        <div className="text-red-500 text-sm mt-2">{photoError}</div>
      )}

      {/* Botón para enviar el formulario */}
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
