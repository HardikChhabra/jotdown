"use client";

import { deleteNote } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { NoteType } from "../types/note";

interface NoteCardProps {
  note: NoteType;
  onSelect: (note: NoteType) => void;
  onEdit: (note: NoteType) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({
  note,
  onSelect,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const { token } = useAuth();
  const { id, title, content } = note;

  const truncateContent = (text: string, maxLength = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(id, String(token));
        onDelete(id);
      } catch (err) {
        console.error("Failed to delete note:", err);
        alert("Failed to delete note. Please try again.");
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(note);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition duration-200"
      onClick={() => onSelect(note)}
    >
      <h3 className="font-bold text-lg mb-2 truncate">
        {title || "Untitled Note"}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{truncateContent(content)}</p>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
