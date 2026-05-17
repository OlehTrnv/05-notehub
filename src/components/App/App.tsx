import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
