"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createNote } from "../utils/api";
import { CreateNoteType, NoteType } from "../types/note";

interface CreateNoteFormProps {
  onNoteCreated: (note: NoteType) => void;
}

export default function CreateNoteForm({ onNoteCreated }: CreateNoteFormProps) {
  const [noteData, setNoteData] = useState<CreateNoteType>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteData.content?.trim()) {
      setError("Note content is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newNote = await createNote(noteData, String(token));
      onNoteCreated(newNote);

      // Reset form
      setNoteData({
        title: "",
        content: "",
      });
    } catch (err) {
      setError("Failed to create note. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create New Note</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title (optional)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title || ""}
            onChange={handleChange}
            placeholder="Note title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={noteData.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}
