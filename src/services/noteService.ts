import axios from "axios";
import type { Note } from "../types/note";
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${import.meta.env.VITE_NOTEHUB_APP_TOKEN}`;

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>("/notes", {
    params: {
      page: page,
      perPage: 12,
      search,
    },
  });
  return res.data;
};
interface NewNote {
  title: string;
  content: string;
  tag: string;
}
export const createNote = async (newNote: NewNote) => {
  const res = await axios.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};
