import axios from "axios";
import type { Note, NewNote } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  query: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    perPage: 12,
    page,
  };

  if (tag) {
    params.tag = tag;
  }

  if (query.trim() !== "") {
    params.search = query;
  }

  const { data } = await axios.get<FetchNotesResponse>(`/notes`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
