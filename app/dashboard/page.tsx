"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import CreateNoteForm from "../components/CreateNoteForm";
import NoteEditor from "../components/NoteEditor";
import { fetchNotes } from "../utils/api";
import { NoteType, UpdateNoteType } from "../types/note";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const getNotes = async () => {
      try {
        setLoading(true);
        const data = await fetchNotes(token);
        setNotes(data);
      } catch (err) {
        setError("Failed to fetch notes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [token, router]);

  const handleNoteCreated = (newNote: NoteType) => {
    setNotes([newNote, ...notes]);
  };

  const handleNoteUpdated = (updatedNote: NoteType) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleNoteDeleted = (deletedId: string) => {
    setNotes(notes.filter((note) => note.id !== deletedId));
    if (selectedNote && selectedNote.id === deletedId) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEditNote = (note: NoteType) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <CreateNoteForm onNoteCreated={handleNoteCreated} />
            <div className="mt-6">
              {loading ? (
                <p className="text-center text-gray-500">Loading notes...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : (
                <NotesList
                  notes={notes}
                  onNoteSelect={setSelectedNote}
                  onEditNote={handleEditNote}
                  onDeleteNote={handleNoteDeleted}
                />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            {isEditing && selectedNote ? (
              <NoteEditor
                noteId={selectedNote.id}
                initialData={{
                  title: selectedNote.title,
                  content: selectedNote.content,
                }}
                onUpdate={handleNoteUpdated}
                onCancel={() => {
                  setSelectedNote(null);
                  setIsEditing(false);
                }}
              />
            ) : selectedNote ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedNote.title || "Untitled Note"}
                </h2>
                <div className="whitespace-pre-wrap">
                  {selectedNote.content}
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEditNote(selectedNote)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleNoteDeleted(selectedNote.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  {notes.length === 0
                    ? "Create your first note to get started!"
                    : "Select a note to view its content"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
