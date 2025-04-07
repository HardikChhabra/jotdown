export type NoteType = {
  id: string;
  createdAt: string;
  title?: string;
  content: string;
  email: string;
};

export type CreateNoteType = Pick<NoteType, "content" | "title">;

export type UpdateNoteType = Partial<CreateNoteType>;
