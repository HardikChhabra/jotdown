import { CreateNoteType, NoteType, UpdateNoteType } from "../types/note";

const API_BASE_URL = "http://localhost:3000";

// Authentication API calls
export const registerUser = async (userData: {
  email: string;
  name: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

// Notes API calls
export const createNote = async (
  noteData: CreateNoteType,
  token: string
): Promise<NoteType> => {
  const response = await fetch(`${API_BASE_URL}/notes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return response.json();
};

export const fetchNotes = async (token: string): Promise<NoteType[]> => {
  const response = await fetch(`${API_BASE_URL}/notes/read`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
};

export const updateNote = async (
  id: string,
  noteData: UpdateNoteType,
  token: string
): Promise<NoteType> => {
  const response = await fetch(`${API_BASE_URL}/notes/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
};

export const deleteNote = async (
  id: string,
  token: string
): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/notes/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    throw new Error("Failed to delete note");
  }

  return true;
};
