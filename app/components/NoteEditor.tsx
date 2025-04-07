"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateNote } from "../utils/api";
import { NoteType, UpdateNoteType } from "../types/note";

interface NoteEditorProps {
  noteId: string;
  initialData: UpdateNoteType;
  onUpdate: (note: NoteType) => void;
  onCancel: () => void;
}

export default function NoteEditor({
  noteId,
  initialData,
  onUpdate,
  onCancel,
}: NoteEditorProps) {
  const [editData, setEditData] = useState<UpdateNoteType>({
    title: initialData.title || "",
    content: initialData.content || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editData.content !== undefined && !editData.content.trim()) {
      setError("Note content is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const updatedNote = await updateNote(noteId, editData, String(token));
      onUpdate(updatedNote);
    } catch (err) {
      setError("Failed to update note. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Edit Note</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="edit-title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="edit-title"
            name="title"
            value={editData.title || ""}
            onChange={handleChange}
            placeholder="Note title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="edit-content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="edit-content"
            name="content"
            value={editData.content || ""}
            onChange={handleChange}
            placeholder="Write your note here..."
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
