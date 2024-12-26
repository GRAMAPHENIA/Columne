// import React, { useState } from "react";
// import Image from "next/image";

// import UploadPhoto from "@/components/icons/UploadPhoto";

// interface AddTaskFormProps {
//   onAddTask: (
//     title: string,
//     description: string,
//     photoUrl?: string,
//     tags?: string[]
//   ) => void;
// }

// export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [tags, setTags] = useState<string[]>([]);
//   const [tagInput, setTagInput] = useState("");

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const photoUrl = photo ? URL.createObjectURL(photo) : undefined;
//     onAddTask(title, description, photoUrl, tags);
//     resetForm();
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setPhoto(null);
//     setPhotoPreview(null);
//     setTags([]);
//     setTagInput("");
//   };

//   const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setPhoto(file);
//     setPhotoPreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleAddTag = () => {
//     const trimmedTag = tagInput.trim();
//     if (trimmedTag && !tags.includes(trimmedTag)) {
//       setTags((prevTags) => [...prevTags, trimmedTag]);
//       setTagInput("");
//     }
//   };

//   const handleRemoveTag = (tag: string) => {
//     setTags((prevTags) => prevTags.filter((t) => t !== tag));
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-900 rounded-lg shadow-lg max-w-6xl mx-auto mb-4">
//       <div className="col-span-1">
//         <h3 className="text-xl font-bold mb-6 text-white">Añadir Nueva Tarea</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <TextInput
//             value={title}
//             onChange={setTitle}
//             placeholder="Título"
//             ariaLabel="Título de la tarea"
//             required
//           />
//           <TextArea
//             value={description}
//             onChange={setDescription}
//             placeholder="Descripción"
//             ariaLabel="Descripción de la tarea"
//             required
//           />

//           {/* Etiquetas */}
//           <TagInput
//             tagInput={tagInput}
//             setTagInput={setTagInput}
//             tags={tags}
//             handleAddTag={handleAddTag}
//             handleRemoveTag={handleRemoveTag}
//           />

//           {/* Subir imagen */}
//           <PhotoUpload
//             handlePhotoChange={handlePhotoChange}
//             photoPreview={photoPreview}
//           />

//           <button
//             type="submit"
//             className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
//             aria-label="Añadir tarea"
//           >
//             Añadir Tarea
//           </button>
//         </form>
//       </div>

//       {/* Contenido vacío (las otras dos columnas) */}
//       <div className="col-span-2 flex justify-center items-center">
//         <p className="text-gray-400">Espacio disponible para futuras funcionalidades.</p>
//       </div>
//     </div>
//   );
// };

// // Componentes reutilizables
// const TextInput: React.FC<{
//   value: string;
//   onChange: React.Dispatch<React.SetStateAction<string>>;
//   placeholder: string;
//   ariaLabel: string;
//   required?: boolean;
// }> = ({ value, onChange, placeholder, ariaLabel, required }) => (
//   <input
//     type="text"
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     placeholder={placeholder}
//     required={required}
//     className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
//     aria-label={ariaLabel}
//   />
// );

// const TextArea: React.FC<{
//   value: string;
//   onChange: React.Dispatch<React.SetStateAction<string>>;
//   placeholder: string;
//   ariaLabel: string;
//   required?: boolean;
// }> = ({ value, onChange, placeholder, ariaLabel, required }) => (
//   <textarea
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     placeholder={placeholder}
//     required={required}
//     rows={3}
//     className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
//     aria-label={ariaLabel}
//   />
// );

// const TagInput: React.FC<{
//   tagInput: string;
//   setTagInput: React.Dispatch<React.SetStateAction<string>>;
//   tags: string[];
//   handleAddTag: () => void;
//   handleRemoveTag: (tag: string) => void;
// }> = ({ tagInput, setTagInput, tags, handleAddTag, handleRemoveTag }) => (
//   <div>
//     <div className="flex items-center space-x-3">
//       <TextInput
//         value={tagInput}
//         onChange={setTagInput}
//         placeholder="Agregar etiqueta"
//         ariaLabel="Agregar etiqueta"
//       />
//       <button
//         type="button"
//         onClick={handleAddTag}
//         className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
//         aria-label="Añadir etiqueta"
//       >
//         Añadir
//       </button>
//     </div>
//     <div className="flex flex-wrap gap-2 mt-3">
//       {tags.map((tag, index) => (
//         <span
//           key={index}
//           className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
//           role="listitem"
//           aria-label={`Etiqueta: ${tag}`}
//         >
//           {tag}
//           <button
//             type="button"
//             onClick={() => handleRemoveTag(tag)}
//             className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
//             aria-label={`Eliminar etiqueta: ${tag}`}
//           >
//             ✕
//           </button>
//         </span>
//       ))}
//     </div>
//   </div>
// );

// const PhotoUpload: React.FC<{
//   handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   photoPreview: string | null;
// }> = ({ handlePhotoChange, photoPreview }) => (
//   <div className="w-full">
//     <label
//       htmlFor="photo-upload"
//       className="block w-full text-center cursor-pointer text-teal-500 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg shadow-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
//       aria-label="Subir foto"
//     >
//       <div className="flex flex-col justify-center items-center">
//         <UploadPhoto />
//       </div>
//     </label>
//     <input
//       id="photo-upload"
//       type="file"
//       accept="image/*"
//       onChange={handlePhotoChange}
//       className="hidden"
//       aria-labelledby="photo-upload"
//     />
//     {photoPreview && (
//       <Image
//         src={photoPreview}
//         alt="Vista previa de la imagen seleccionada"
//         width={100}
//         height={100}
//         className="h-20 w-full object-cover mt-4 rounded-lg border border-gray-700"
//       />
//     )}
//   </div>
// );
