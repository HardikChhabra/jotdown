"use client";

import NoteCard from "./NoteCard";
import { NoteType } from "../types/note";

interface NotesListProps {
  notes: NoteType[];
  onNoteSelect: (note: NoteType) => void;
  onEditNote: (note: NoteType) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesList({
  notes,
  onNoteSelect,
  onEditNote,
  onDeleteNote,
}: NotesListProps) {
  if (!notes.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onSelect={onNoteSelect}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
    </div>
  );
}
